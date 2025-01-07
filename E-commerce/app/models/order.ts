import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/orm'
import OrderItem from './order_item.js'
import User from './user.js'
import Product from './product.js'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user_id: number

  @column()
  declare status: 'pending' | 'paid' | 'cancelled' | 'delivered'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(()=> OrderItem)
  declare  orderItems: HasMany<typeof OrderItem>

@manyToMany(() => Product, {
  pivotTable: 'order_items',
  pivotColumns: ['quantity', 'price'],
})
declare products: ManyToMany<typeof Product>

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
