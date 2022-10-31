// import { V86Starter } from "v86/build/index";
// import seabios from "v86/bios/seabios.bin";

//import React from 'react'

export default class V86Terminal {
    constructor(term) {
        this.term = term;

        // this.v86 = React.createRef()
        //
        // this.v86.current =  new V86Starter({
        //     memory_size: 32 * 1024 * 1024,
        //     // vga_memory_size: 2 * 1024 * 1024,
        //     bios: { url: seabios },
        //     // vga_bios: { url: vgabios },
        //     autostart: false
        // })
        // window.emulator = this.v86.current;
    }

    ready() {

    }

    onKey(e) {
        console.log(e)
    }
}
