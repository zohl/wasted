/// <reference path="group.d.ts"/>

let mkGroup = (
      protocol: string
    , hostname: string
    , port    : string
    , pathname: string
): Group => {
    return {
        name: [hostname].join('')
    };
};

export {mkGroup};
