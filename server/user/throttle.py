from rest_framework.throttling import AnonRateThrottle

class SendOTPThrottle(AnonRateThrottle):
    rate = '1/s'

    def parse_rate(self, rate):
        return (1, 30)