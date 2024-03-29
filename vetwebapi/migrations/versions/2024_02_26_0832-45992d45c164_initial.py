"""initial

Revision ID: 45992d45c164
Revises: 
Create Date: 2024-02-26 08:32:41.334172

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "45992d45c164"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "accounting_units",
        sa.Column("name", sa.String(length=100), nullable=False),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "administration_methods",
        sa.Column("name", sa.String(length=50), nullable=False),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "budgets",
        sa.Column("name", sa.String(length=100), nullable=False),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "companies",
        sa.Column("full_name", sa.String(), nullable=False),
        sa.Column("short_name", sa.String(), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "diseases",
        sa.Column("name", sa.String(length=300), nullable=False),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "dosages",
        sa.Column("name", sa.String(length=300), nullable=False),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "drug_manufacturers",
        sa.Column("name", sa.String(length=100), nullable=False),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "operations",
        sa.Column("name", sa.String(length=100), nullable=False),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "places_of_administration",
        sa.Column("name", sa.String(length=300), nullable=False),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "positions",
        sa.Column("name", sa.String(length=100), nullable=False),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "regions",
        sa.Column("name", sa.String(length=100), nullable=False),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "roles",
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "types_of_feeding",
        sa.Column("name", sa.String(length=100), nullable=False),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "usage_types",
        sa.Column("name", sa.String(length=100), nullable=False),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "animal_groups",
        sa.Column("type_of_feeding_id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=100), nullable=False),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["type_of_feeding_id"], ["types_of_feeding.id"], ondelete="CASCADE"
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "districts",
        sa.Column("region_id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=100), nullable=False),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["region_id"], ["regions.id"], ondelete="CASCADE"
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "drug_movements",
        sa.Column("operation_id", sa.Integer(), nullable=False),
        sa.Column("operation_date", sa.Date(), nullable=False),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["operation_id"], ["operations.id"], ondelete="CASCADE"
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "drugs",
        sa.Column("disease_id", sa.Integer(), nullable=False),
        sa.Column("drug_manufacturer_id", sa.Integer(), nullable=False),
        sa.Column("budget_id", sa.Integer(), nullable=False),
        sa.Column("accounting_unit_id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=300), nullable=False),
        sa.Column("batch", sa.String(length=10), nullable=False),
        sa.Column("control", sa.String(length=10), nullable=False),
        sa.Column("production_date", sa.Date(), nullable=False),
        sa.Column("expiration_date", sa.Date(), nullable=False),
        sa.Column("packing", sa.Float(), nullable=False),
        sa.Column("instruction", sa.String(), nullable=True),
        sa.Column("is_active", sa.Boolean(), nullable=False),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["accounting_unit_id"], ["accounting_units.id"], ondelete="CASCADE"
        ),
        sa.ForeignKeyConstraint(
            ["budget_id"], ["budgets.id"], ondelete="CASCADE"
        ),
        sa.ForeignKeyConstraint(
            ["disease_id"], ["diseases.id"], ondelete="CASCADE"
        ),
        sa.ForeignKeyConstraint(
            ["drug_manufacturer_id"],
            ["drug_manufacturers.id"],
            ondelete="CASCADE",
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "employees",
        sa.Column("company_id", sa.Integer(), nullable=False),
        sa.Column("position_id", sa.Integer(), nullable=False),
        sa.Column("lastname", sa.String(length=50), nullable=False),
        sa.Column("firstname", sa.String(length=30), nullable=False),
        sa.Column("patronymic", sa.String(length=100), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["company_id"], ["companies.id"], ondelete="CASCADE"
        ),
        sa.ForeignKeyConstraint(
            ["position_id"], ["positions.id"], ondelete="CASCADE"
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "users",
        sa.Column("role_id", sa.Integer(), nullable=False),
        sa.Column("username", sa.String(length=10), nullable=False),
        sa.Column("email", sa.String(length=320), nullable=True),
        sa.Column("hashed_password", sa.String(length=1024), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False),
        sa.Column("is_superuser", sa.Boolean(), nullable=False),
        sa.Column("is_verified", sa.Boolean(), nullable=False),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(["role_id"], ["roles.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("hashed_password"),
        sa.UniqueConstraint("username"),
    )
    op.create_index(op.f("ix_users_email"), "users", ["email"], unique=True)
    op.create_table(
        "cities",
        sa.Column("district_id", sa.Integer(), nullable=True),
        sa.Column("name", sa.String(length=100), nullable=False),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["district_id"], ["districts.id"], ondelete="CASCADE"
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "drugs_in_movement",
        sa.Column("drug_movement_id", sa.Integer(), nullable=False),
        sa.Column("drug_id", sa.Integer(), nullable=False),
        sa.Column("packs_amount", sa.Integer(), nullable=False),
        sa.Column("units_amount", sa.Float(), nullable=False),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(["drug_id"], ["drugs.id"]),
        sa.ForeignKeyConstraint(["drug_movement_id"], ["drug_movements.id"]),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint(
            "drug_movement_id", "drug_id", name="idx_unique_drug_in_movement"
        ),
    )
    op.create_table(
        "species",
        sa.Column("animal_group_id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=100), nullable=False),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["animal_group_id"], ["animal_groups.id"], ondelete="CASCADE"
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "genders",
        sa.Column("species_id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=100), nullable=False),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["species_id"], ["species.id"], ondelete="CASCADE"
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "streets",
        sa.Column("city_id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=250), nullable=False),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["city_id"], ["cities.id"], ondelete="CASCADE"
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "addresses",
        sa.Column("company_id", sa.Integer(), nullable=False),
        sa.Column("street_id", sa.Integer(), nullable=False),
        sa.Column("house_number", sa.String(length=5), nullable=False),
        sa.Column("phone_number1", sa.String(), nullable=False),
        sa.Column("phone_number2", sa.String(), nullable=True),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["company_id"], ["companies.id"], ondelete="CASCADE"
        ),
        sa.ForeignKeyConstraint(
            ["street_id"], ["streets.id"], ondelete="CASCADE"
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "animals",
        sa.Column("species_id", sa.Integer(), nullable=False),
        sa.Column("company_id", sa.Integer(), nullable=False),
        sa.Column("usage_type_id", sa.Integer(), nullable=False),
        sa.Column("gender_id", sa.Integer(), nullable=False),
        sa.Column("date_of_birth", sa.Date(), nullable=False),
        sa.Column("nickname", sa.String(length=100), nullable=False),
        sa.Column("identification", sa.String(length=15), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["company_id"], ["companies.id"], ondelete="CASCADE"
        ),
        sa.ForeignKeyConstraint(
            ["gender_id"], ["genders.id"], ondelete="CASCADE"
        ),
        sa.ForeignKeyConstraint(
            ["species_id"], ["species.id"], ondelete="CASCADE"
        ),
        sa.ForeignKeyConstraint(
            ["usage_type_id"], ["usage_types.id"], ondelete="CASCADE"
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("animals")
    op.drop_table("addresses")
    op.drop_table("streets")
    op.drop_table("genders")
    op.drop_table("species")
    op.drop_table("drugs_in_movement")
    op.drop_table("cities")
    op.drop_index(op.f("ix_users_email"), table_name="users")
    op.drop_table("users")
    op.drop_table("employees")
    op.drop_table("drugs")
    op.drop_table("drug_movements")
    op.drop_table("districts")
    op.drop_table("animal_groups")
    op.drop_table("usage_types")
    op.drop_table("types_of_feeding")
    op.drop_table("roles")
    op.drop_table("regions")
    op.drop_table("positions")
    op.drop_table("places_of_administration")
    op.drop_table("operations")
    op.drop_table("drug_manufacturers")
    op.drop_table("dosages")
    op.drop_table("diseases")
    op.drop_table("companies")
    op.drop_table("budgets")
    op.drop_table("administration_methods")
    op.drop_table("accounting_units")
    # ### end Alembic commands ###
