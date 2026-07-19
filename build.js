import {join} from "path";
import {existsSync, rmdirSync} from "fs";

import {build} from "./package.json";

if(existsSync(build.outdir)){
    if(build.clean_outdir){
        rmdirSync(build.outdir, {recursive: true, force: true});
    }
}

let path = join(build.outdir, build.filename);

build.targets.forEach(async (target)=>{
    await Bun.build({
        entrypoints: [build.entrypoint],
        compile: {
            target,
            outfile: path
        }
    });
});