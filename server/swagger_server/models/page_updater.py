from selenium import webdriver
from threading import Timer, Lock


def timer_function(updater):
    updater.show_next()


class PageUpdater:
    def __init__(self, config):
        self.config = config
        print("*** PageUpdater Created ***")
        print(self.config)
        self.lock = Lock()
        self.config_index = 0
        self.timer = None
        self.driver = webdriver.Chrome()
        self.show_next()
        print("*** PageUpdate create finished")

    def internal_show_next(self):
        if len(self.config.board_list) == 0:
            return
        url = self.config.board_list[self.config_index]
        print("*** Setting display to {} ***".format(url))
        self.driver.get(url)
        self.config_index += 1
        if self.config_index >= len(self.config.board_list):
            self.config_index = 0
        self.timer = Timer(self.config.delay, timer_function, [self])
        self.timer.start()

    def internal_restart(self):
        if self.timer is not None:
            self.timer.cancel()
            self.timer = None
        self.config_index = 0

    def show_next(self):
        print("*** show_next acquiring ***")
        self.lock.acquire()
        print("*** show_next acquired ***")
        try:
            self.internal_show_next()
        finally:
            print("*** show_next release ***")
            self.lock.release()

    def reload_config(self, config):
        print("*** reload_config acquiring ***")
        self.lock.acquire()
        print("*** reload_config acquired ***")
        try:
            self.config = config
            self.internal_restart()
            self.internal_show_next()
        finally:
            print("*** reload_config release ***")
            self.lock.release()
