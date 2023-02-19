import {Socket} from 'socket.io-client'
import {createSignal} from 'solid-js'

export default createSignal<Socket | null>(null)
