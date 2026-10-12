<script lang="ts" setup>
import { useLogin } from '@/hooks/login.hooks';
import type { OrderModel } from '@/models/order.model';
import { FlightService } from '@/services/flight.service';
import { UserService } from '@/services/user.service';
import { computed, onMounted, ref } from 'vue';

const validateLogin = useLogin()

const user = UserService.getActiveUser()
const flightId = user?.orders.map(o =>o.flightId)

const orders = ref<OrderModel[]>([])
    if(user){
        orders.value = user.orders
    }

    FlightService.getDepartureByIds(flightId ?? [])
    .then(data => {
        const ordersToIterate = user!.orders
        for(let order of ordersToIterate)
            for(let flight of data){
                if(order.flightId === flight.id){
                    order.destination = flight.destination
                    order.flightNumber = flight.flightNumber
                    order.scheduledAt = flight.scheduledAt
                    order.estimatedAt = flight.estimatedAt
                }
            }
            orders.value = ordersToIterate
    })

    function getPriceForOrder(order: OrderModel){
        return order.pricePerTicket * order.ticketCount * (order.isReturnTicket ? 1.8 : 1)
    }

const total = computed(()=>{
    let sum = 0
    for(let order of orders.value){
        sum += getPriceForOrder(order)
    }
    return sum
})

onMounted(() => validateLogin())
</script>

<template>
    <div class="card" v-if="user && orders">
        <div class="card-header fw-bold">
            Orders
        </div>
        <div class="card-body">
            <pre>{{ orders }}</pre>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Destination</th>
                        <th scope="col">Flight Number</th>
                        <th scope="col">Flight Class</th>
                        <th scope="col">Return Ticket</th>
                        <th scope="col">Ticket Count</th>
                        <th scope="col">Options</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in orders">
                        <th scope="row">{{ order.flightId }}</th>
                        <td>/</td>
                        <td>/</td>
                        <td>
                            <span v-if="order.flightClass == 'f'">
                                First Class
                            </span>
                            <span v-if="order.flightClass == 'b'">
                                Buisiness Class
                            </span>
                            <span v-if ="order.flightClass == 'e'">
                                Economy Class
                            </span>
                        </td>
                        <td>{{ order.isReturnTicket? 'Yes' : 'No' }}</td>
                        <td>{{ order.ticketCount }}</td>
                        <td>{{  }} EUR</td>
                        <td>
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-primary">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </button>
                                <button type="button" class="btn btn-sm btn-danger">
                                    <i class="fa-solid fa-trash-can"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
             <tr>
                <p class="fw-bold display-6">Total: 0EUR</p>
             </tr>
        </div>
        <div class="card-footer">
            <button type="button" class="btn btn-success">
                <i class="fa-solid fa-credit-card"></i> Checkout
            </button>
        </div>
    </div>
    <pre>{{ UserService.getActiveUser() }}</pre>
</template>
