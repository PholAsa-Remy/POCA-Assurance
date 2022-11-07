import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Customer1667668327514 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('customer', true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('customer', true);
  }
}
