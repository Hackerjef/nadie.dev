import { V86Starter } from "v86/build/libv86"


export default class V86Terminal {
    constructor(main) {
        this.main = main;
        this.emulator = null
    }

    ready() {
        this.main.terminal.writeln("This may take a while :)")
        this.main.terminal.writeln("↳ This is a proof of concept that v86 is working with its pre-made buildroot image")

        this.emulator = new V86Starter({
            wasm_path: "v86/v86.wasm",
            wasm_fallback_path: "v86/v86-fallback.wasm",
            memory_size: 128 * 1024 * 1024,
            vga_memory_size: 2 * 1024 * 1024,

            bios: {
                url: "v86/seabios.bin",
            },

            vga_bios: {
                url: "v86/vgabios.bin",
            },

            bzimage: {
                url: "v86/buildroot-bzimage.bin",
                size: 5166352,
                async: true,
            },
            filesystem: {},
            cmdline: "tsc=reliable mitigations=off random.trust_cpu=on console=ttyS0,9600 console=tty0",

            disable_keyboard: true,
            disable_mouse: true,
            autostart: true,
            network_relay_url: "wss://relay.widgetry.org/"
        })

        this.emulator.bus.register("serial0-output-char", function (char) {
            this.main.terminal.write(char)
        }, this)
    }

    ondata(data) {
        for (let i = 0; i < data.length; i++) {
            this.emulator.bus.send("serial0-input", data.charCodeAt(i));
        }
    }
}
