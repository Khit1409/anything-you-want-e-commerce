// src/stores/entities/store.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Seller } from './seller.entity';

/* ============================
   STORES TABLE
   (1 Seller – N Store)
============================ */

@Entity('stores')
export class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'store_code',
    unique: true,
  })
  storeCode: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
  })
  updatedAt: Date;

  /* ============================
     RELATION: Many Stores -> One Seller
  ============================ */

  @ManyToOne(() => Seller, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'seller_id' })
  seller: Seller;

  /* ============================
     RELATION: One Store -> One Info
  ============================ */

  @OneToOne(() => StoreInfo, (info) => info.store, {
    cascade: true,
  })
  info: StoreInfo;
}

/* ============================
   STORE INFO TABLE (1–1)
============================ */

@Entity('store_info')
export class StoreInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  avatar: string;

  @Column({ type: 'text', nullable: true })
  thumbnail: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    name: 'phone_number',
    length: 15,
  })
  phoneNumber: string;

  @Column({
    name: 'email_address',
  })
  emailAddress: string;

  /* ============================
     RELATION: OneToOne Store
  ============================ */

  @OneToOne(() => Store, (store) => store.info, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'store_id' })
  store: Store;
}
