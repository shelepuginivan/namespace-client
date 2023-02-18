import {createSignal} from 'solid-js'
import {Socket} from 'socket.io-client'

export default createSignal<Socket | null>(null)
