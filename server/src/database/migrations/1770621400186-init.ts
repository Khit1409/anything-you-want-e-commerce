import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1770621400186 implements MigrationInterface {
  name = 'Init1770621400186';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "seller_info" DROP CONSTRAINT "fk_seller_info_with_seller"`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller_phones" DROP CONSTRAINT "fk_seller_phone_with_seller"`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller_address" DROP CONSTRAINT "fk_seller_address_with_sellers"`,
    );
    await queryRunner.query(
      `ALTER TABLE "store_info" DROP CONSTRAINT "store_info_store_id_foreign"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stores" DROP CONSTRAINT "fk_store_with_seller"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_info" DROP CONSTRAINT "fk_user_info_with_user"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_address" DROP CONSTRAINT "fk_user_address_with_users"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_phones" DROP CONSTRAINT "fk_user_phone_with_user"`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller_phones" DROP CONSTRAINT "seller_phones_type_check"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sellers" DROP CONSTRAINT "sellers_status_check"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "users_status_check"`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller_info" DROP COLUMN "first_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller_info" ADD "first_name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller_info" DROP COLUMN "last_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller_info" ADD "last_name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller_info" DROP COLUMN "full_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller_info" ADD "full_name" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "seller_info" DROP COLUMN "avatar"`);
    await queryRunner.query(
      `ALTER TABLE "seller_info" ADD "avatar" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller_info" ALTER COLUMN "seller_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller_info" ADD CONSTRAINT "UQ_ee2827059b61a11dc56a712d7d2" UNIQUE ("seller_id")`,
    );
    await queryRunner.query(`ALTER TABLE "seller_phones" DROP COLUMN "type"`);
    await queryRunner.query(
      `CREATE TYPE "public"."seller_phones_type_enum" AS ENUM('company', 'individual')`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller_phones" ADD "type" "public"."seller_phones_type_enum" NOT NULL DEFAULT 'individual'`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller_phones" ALTER COLUMN "seller_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller_address" ALTER COLUMN "seller_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sellers" DROP CONSTRAINT "seller_email_index"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sellers" DROP COLUMN "email_address"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sellers" ADD "email_address" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sellers" ADD CONSTRAINT "UQ_7629d05517b4f0fd38a909695ba" UNIQUE ("email_address")`,
    );
    await queryRunner.query(
      `ALTER TABLE "sellers" DROP COLUMN "hash_password"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sellers" ADD "hash_password" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "sellers" DROP COLUMN "status"`);
    await queryRunner.query(
      `CREATE TYPE "public"."sellers_status_enum" AS ENUM('active', 'inactive', 'banned')`,
    );
    await queryRunner.query(
      `ALTER TABLE "sellers" ADD "status" "public"."sellers_status_enum" NOT NULL DEFAULT 'inactive'`,
    );
    await queryRunner.query(
      `ALTER TABLE "sellers" ALTER COLUMN "last_login_at" TYPE TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "sellers" ALTER COLUMN "created_at" TYPE TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "sellers" ALTER COLUMN "created_at" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sellers" ALTER COLUMN "created_at" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "sellers" ALTER COLUMN "updated_at" TYPE TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "sellers" ALTER COLUMN "updated_at" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sellers" ALTER COLUMN "updated_at" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "store_info" DROP CONSTRAINT "store_info_name_unique"`,
    );
    await queryRunner.query(`ALTER TABLE "store_info" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "store_info" ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "store_info" ADD CONSTRAINT "UQ_9e4f603371e3fe576e552ae84fb" UNIQUE ("name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "store_info" DROP CONSTRAINT "store_info_slug_unique"`,
    );
    await queryRunner.query(`ALTER TABLE "store_info" DROP COLUMN "slug"`);
    await queryRunner.query(
      `ALTER TABLE "store_info" ADD "slug" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "store_info" ADD CONSTRAINT "UQ_f5d5ad4b03045a099cff3641f4e" UNIQUE ("slug")`,
    );
    await queryRunner.query(
      `ALTER TABLE "store_info" DROP COLUMN "email_address"`,
    );
    await queryRunner.query(
      `ALTER TABLE "store_info" ADD "email_address" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "store_info" ALTER COLUMN "store_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "store_info" ADD CONSTRAINT "UQ_4de73724aade410eb87ca946ace" UNIQUE ("store_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "stores" DROP CONSTRAINT "stores_store_code_unique"`,
    );
    await queryRunner.query(`ALTER TABLE "stores" DROP COLUMN "store_code"`);
    await queryRunner.query(
      `ALTER TABLE "stores" ADD "store_code" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "stores" ADD CONSTRAINT "UQ_2036aef5ff1670dac3746643f2e" UNIQUE ("store_code")`,
    );
    await queryRunner.query(
      `ALTER TABLE "stores" ALTER COLUMN "created_at" TYPE TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "stores" ALTER COLUMN "created_at" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "stores" ALTER COLUMN "created_at" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "stores" ALTER COLUMN "updated_at" TYPE TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "stores" ALTER COLUMN "updated_at" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "stores" ALTER COLUMN "updated_at" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "stores" ALTER COLUMN "seller_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_info" ALTER COLUMN "user_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_info" ADD CONSTRAINT "UQ_59c55ac40f267d450246040899e" UNIQUE ("user_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_address" ALTER COLUMN "user_id" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "hash_password"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "hash_password" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "status"`);
    await queryRunner.query(
      `CREATE TYPE "public"."users_status_enum" AS ENUM('active', 'inactive', 'banned')`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "status" "public"."users_status_enum" NOT NULL DEFAULT 'active'`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "last_login_at" TYPE TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "created_at" TYPE TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "created_at" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "updated_at" TYPE TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "updated_at" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_phones" ALTER COLUMN "user_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller_info" ADD CONSTRAINT "FK_ee2827059b61a11dc56a712d7d2" FOREIGN KEY ("seller_id") REFERENCES "sellers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller_phones" ADD CONSTRAINT "FK_fd8e9628ea2ebebe5f1ca0479b3" FOREIGN KEY ("seller_id") REFERENCES "sellers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller_address" ADD CONSTRAINT "FK_977c68add9c856eb9d96db99d19" FOREIGN KEY ("seller_id") REFERENCES "sellers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "store_info" ADD CONSTRAINT "FK_4de73724aade410eb87ca946ace" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "stores" ADD CONSTRAINT "FK_540fd9716dec62b65e2d15a8ced" FOREIGN KEY ("seller_id") REFERENCES "sellers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_info" ADD CONSTRAINT "FK_59c55ac40f267d450246040899e" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_address" ADD CONSTRAINT "FK_29d6df815a78e4c8291d3cf5e53" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_phones" ADD CONSTRAINT "FK_96bd55026671b792bb3ce699ffd" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_phones" DROP CONSTRAINT "FK_96bd55026671b792bb3ce699ffd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_address" DROP CONSTRAINT "FK_29d6df815a78e4c8291d3cf5e53"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_info" DROP CONSTRAINT "FK_59c55ac40f267d450246040899e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stores" DROP CONSTRAINT "FK_540fd9716dec62b65e2d15a8ced"`,
    );
    await queryRunner.query(
      `ALTER TABLE "store_info" DROP CONSTRAINT "FK_4de73724aade410eb87ca946ace"`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller_address" DROP CONSTRAINT "FK_977c68add9c856eb9d96db99d19"`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller_phones" DROP CONSTRAINT "FK_fd8e9628ea2ebebe5f1ca0479b3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller_info" DROP CONSTRAINT "FK_ee2827059b61a11dc56a712d7d2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_phones" ALTER COLUMN "user_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "updated_at" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "updated_at" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "updated_at" TYPE TIMESTAMP(0) WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "created_at" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "created_at" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "created_at" TYPE TIMESTAMP(0) WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "last_login_at" TYPE TIMESTAMP(0) WITH TIME ZONE`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "status" character varying(255) NOT NULL DEFAULT 'active'`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "hash_password"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "hash_password" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_address" ALTER COLUMN "user_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_info" DROP CONSTRAINT "UQ_59c55ac40f267d450246040899e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_info" ALTER COLUMN "user_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "stores" ALTER COLUMN "seller_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "stores" ALTER COLUMN "updated_at" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "stores" ALTER COLUMN "updated_at" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "stores" ALTER COLUMN "updated_at" TYPE TIMESTAMP(0) WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "stores" ALTER COLUMN "created_at" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "stores" ALTER COLUMN "created_at" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "stores" ALTER COLUMN "created_at" TYPE TIMESTAMP(0) WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "stores" DROP CONSTRAINT "UQ_2036aef5ff1670dac3746643f2e"`,
    );
    await queryRunner.query(`ALTER TABLE "stores" DROP COLUMN "store_code"`);
    await queryRunner.query(
      `ALTER TABLE "stores" ADD "store_code" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "stores" ADD CONSTRAINT "stores_store_code_unique" UNIQUE ("store_code")`,
    );
    await queryRunner.query(
      `ALTER TABLE "store_info" DROP CONSTRAINT "UQ_4de73724aade410eb87ca946ace"`,
    );
    await queryRunner.query(
      `ALTER TABLE "store_info" ALTER COLUMN "store_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "store_info" DROP COLUMN "email_address"`,
    );
    await queryRunner.query(
      `ALTER TABLE "store_info" ADD "email_address" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "store_info" DROP CONSTRAINT "UQ_f5d5ad4b03045a099cff3641f4e"`,
    );
    await queryRunner.query(`ALTER TABLE "store_info" DROP COLUMN "slug"`);
    await queryRunner.query(
      `ALTER TABLE "store_info" ADD "slug" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "store_info" ADD CONSTRAINT "store_info_slug_unique" UNIQUE ("slug")`,
    );
    await queryRunner.query(
      `ALTER TABLE "store_info" DROP CONSTRAINT "UQ_9e4f603371e3fe576e552ae84fb"`,
    );
    await queryRunner.query(`ALTER TABLE "store_info" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "store_info" ADD "name" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "store_info" ADD CONSTRAINT "store_info_name_unique" UNIQUE ("name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "sellers" ALTER COLUMN "updated_at" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "sellers" ALTER COLUMN "updated_at" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sellers" ALTER COLUMN "updated_at" TYPE TIMESTAMP(0) WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "sellers" ALTER COLUMN "created_at" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "sellers" ALTER COLUMN "created_at" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sellers" ALTER COLUMN "created_at" TYPE TIMESTAMP(0) WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "sellers" ALTER COLUMN "last_login_at" TYPE TIMESTAMP(0) WITH TIME ZONE`,
    );
    await queryRunner.query(`ALTER TABLE "sellers" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."sellers_status_enum"`);
    await queryRunner.query(
      `ALTER TABLE "sellers" ADD "status" character varying(255) NOT NULL DEFAULT 'inactive'`,
    );
    await queryRunner.query(
      `ALTER TABLE "sellers" DROP COLUMN "hash_password"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sellers" ADD "hash_password" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sellers" DROP CONSTRAINT "UQ_7629d05517b4f0fd38a909695ba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sellers" DROP COLUMN "email_address"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sellers" ADD "email_address" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sellers" ADD CONSTRAINT "seller_email_index" UNIQUE ("email_address")`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller_address" ALTER COLUMN "seller_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller_phones" ALTER COLUMN "seller_id" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "seller_phones" DROP COLUMN "type"`);
    await queryRunner.query(`DROP TYPE "public"."seller_phones_type_enum"`);
    await queryRunner.query(
      `ALTER TABLE "seller_phones" ADD "type" character varying(255) NOT NULL DEFAULT 'individual'`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller_info" DROP CONSTRAINT "UQ_ee2827059b61a11dc56a712d7d2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller_info" ALTER COLUMN "seller_id" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "seller_info" DROP COLUMN "avatar"`);
    await queryRunner.query(`ALTER TABLE "seller_info" ADD "avatar" text`);
    await queryRunner.query(
      `ALTER TABLE "seller_info" DROP COLUMN "full_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller_info" ADD "full_name" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller_info" DROP COLUMN "last_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller_info" ADD "last_name" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller_info" DROP COLUMN "first_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller_info" ADD "first_name" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "users_status_check" CHECK (((status)::text = ANY ((ARRAY['active'::character varying, 'inactive'::character varying, 'banned'::character varying])::text[])))`,
    );
    await queryRunner.query(
      `ALTER TABLE "sellers" ADD CONSTRAINT "sellers_status_check" CHECK (((status)::text = ANY ((ARRAY['active'::character varying, 'inactive'::character varying, 'banned'::character varying])::text[])))`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller_phones" ADD CONSTRAINT "seller_phones_type_check" CHECK (((type)::text = ANY ((ARRAY['company'::character varying, 'individual'::character varying])::text[])))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_phones" ADD CONSTRAINT "fk_user_phone_with_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_address" ADD CONSTRAINT "fk_user_address_with_users" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_info" ADD CONSTRAINT "fk_user_info_with_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "stores" ADD CONSTRAINT "fk_store_with_seller" FOREIGN KEY ("seller_id") REFERENCES "sellers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "store_info" ADD CONSTRAINT "store_info_store_id_foreign" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller_address" ADD CONSTRAINT "fk_seller_address_with_sellers" FOREIGN KEY ("seller_id") REFERENCES "sellers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller_phones" ADD CONSTRAINT "fk_seller_phone_with_seller" FOREIGN KEY ("seller_id") REFERENCES "sellers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller_info" ADD CONSTRAINT "fk_seller_info_with_seller" FOREIGN KEY ("seller_id") REFERENCES "sellers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
