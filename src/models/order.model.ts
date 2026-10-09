
export interface OrderModel{
        flightId: number
        flightClass: 'f' | 'b' | 'e'
        tiketCount: number
        pricePerTicket: number
        createdAt: string
        paidAt: string | null
        deleteAt: string | null

}