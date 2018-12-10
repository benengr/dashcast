import webbrowser
import asyncio
from threading import Timer


def timer_function(args):
    page_updater = args[0]
    page_updater.show_next()


class PageUpdater:
    def __init__(self, config):
        self.config = config
        self.lock = asyncio.Lock()
        self.config_index = 0
        self.timer = None
        self.show_next()

    def show_next(self):
        async with self.lock:
            webbrowser.open(self.config.board_list[self.config_index])
            self.config_index += 1
            if self.config_index >= len(self.config.board_list):
                self.config_index = 0
            self.timer = Timer(self.config.delay, timer_function, [self])
            self.timer.start()

    def reload_config(self, config):
        async with self.lock:
            self.config = config
            self.config_index = 0
            self.show_next()
