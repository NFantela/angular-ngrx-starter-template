import { Pipe, PipeTransform } from '@angular/core';

export type MapperFn<T, G> = (item: T, ...args: any[]) => G;

/**
 * Mapper pipe that transforms data in template with pure functions 
 * @param value is value to transform
 * @param mapFn is a function that will do the transforming
 * @param args additional params mapFn 
 * e.g. Value is {{ value | mapDataWithFn : maxFn : max  }}
 */
@Pipe({ name: 'mapDataWithFn' })
export class MapDataPipe<T, G> implements PipeTransform {

    transform(value: T, mapFn: MapperFn<T, G>, ...args: any[]) {
        return mapFn(value, ...args);
    }
}