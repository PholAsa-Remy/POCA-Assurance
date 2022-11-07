import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Quote1667668982913 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('quote', true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('quote', true);
  }
}
