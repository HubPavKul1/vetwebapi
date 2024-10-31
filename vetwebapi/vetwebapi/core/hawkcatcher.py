from hawkcatcher import Hawk
from .settings import settings


hawk = Hawk(str(settings.hawk_token))
