import core from '../styles/core/vars.scss';

export const rankColorMap: { [key: number]: string } = {
    1: 'gold',
    2: 'silver',
    3: 'bronze'
}

export const divisionColorsByString: { [key: string]: string } = {
    Nautical: 'blue',
    Motor: 'purple',
    Watches: 'yellow',
    Aerospace: 'green'
}

export const divisionHexColorMap: { [key: string]: string } = {
    Nautical: core.blue,
    Motor: core.purple,
    Watches: core.yellow,
    Aerospace: core.green,
    Electrical: core.orange
}

export const divisionHexColorMapLighten: { [key: string]: string } = {
    Nautical: core.blue7,
    Motor: core.purple7,
    Watches: core.yellow7,
    Aerospace: core.green7,
    Electrical: core.orange7
}

export const saleStatusColorMap: { [key: string]: string } = {
    COMPLETE: core.green,
    CLOSED: core.red
}

export const colors: { [key: string]: string } = {
    purple: core.purple,
    green: core.green,
    red: core.red,
    blue: core.blue,
    pink: core.pink,
    orange: core.orange,
    primary: core.primary,
    lightGrey: core.lightGrey,
    purple1: core.purple1,
    purple2: core.purple2,
    purple3: core.purple3,
    purple4: core.purple4,
    purple5: core.purple5,
    purple6: core.purple6,
    purple7: core.purple7,
    purple8: core.purple8,
    blue1: core.blue1,
    blue2: core.blue2,
    blue3: core.blue3,
    blue4: core.blue4,
    blue5: core.blue5,
    blue6: core.blue6,
    blue7: core.blue7,
    blue8: core.blue8,
}