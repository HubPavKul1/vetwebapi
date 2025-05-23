import os
from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.models.base import Base
from core.settings import settings

if TYPE_CHECKING:
    from vetwebapi.core.models import VetWork


class VetWorkFile(Base):
    """Модель Документ ПЭМ"""

    __tablename__ = "vetwork_files"

    vetwork_id: Mapped[int] = mapped_column(
        ForeignKey("vetworks.id", ondelete="CASCADE")
    )

    file_path: Mapped[str] = mapped_column(String(300))

    vetwork: Mapped["VetWork"] = relationship(
        back_populates="vetwork_file", lazy="joined"
    )

    def create_file_path(self, filename: str) -> str:
        """Create relative path for file"""
        file_dir = os.path.join(settings.media_dir, "vetworks")
        if not os.path.isdir(file_dir):
            os.mkdir(file_dir)
        return os.path.join("vetworks", filename)
