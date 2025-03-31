import { ProjectMetadata } from "./Global";
import { Fn, Stack } from "aws-cdk-lib";


export const stackNamingHook = (metadata : ProjectMetadata, stackType : string) => {
    return `${metadata.squad}-${metadata.name}-${stackType}`
}

export const customResourceNamingHook = (stack : Stack, metadata : ProjectMetadata, custonName: string) => {
    const shortStackId = Fn.select(2, Fn.split('/', stack.stackId))
    const suffix = Fn.select(4, Fn.split('-', shortStackId))

    return `${metadata.squad}-${metadata.name}-${custonName}-${suffix}`
}