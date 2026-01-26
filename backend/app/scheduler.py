import os
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.interval import IntervalTrigger
from typing import Callable, Optional

_scheduler: Optional[BackgroundScheduler] = None

def start_scheduler(job_func: Callable):
    global _scheduler
    if _scheduler is not None:
        return

    interval = int(os.getenv('SYNC_INTERVAL_SECONDS', '3600'))
    _scheduler = BackgroundScheduler()
    _scheduler.add_job(job_func, trigger=IntervalTrigger(seconds=interval), id='sanity_sync', replace_existing=True)
    _scheduler.start()

def shutdown_scheduler():
    global _scheduler
    if _scheduler is None:
        return
    _scheduler.shutdown(wait=False)
    _scheduler = None
