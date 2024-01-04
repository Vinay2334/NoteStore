"""Django command to wait for database to be available"""
from django.core.management.base import BaseCommand
import time
from django.db.utils import OperationalError

class Command(BaseCommand):
    """Django command to wait for database"""

    def handle(self, *args, **kwargs):
        """Entrypoint for command"""
        self.stdout.write('Waiting for database...')
        db_up = False
        while db_up is False:
            try:
                self.check(databases=['default'])
                db_up = True
            except(OperationalError):
                self.stdout.write('Databse unavailable, waiting 1 second...')
                time.sleep()
        
        self.stdout.write(self.style.SUCCESS('Database available!'))