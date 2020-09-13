import {Connection} from "typeorm";
import {Location} from "../../entities";

export default async function selectAllLocations(connection: Connection): Promise<Location[]> {
    return await connection
        .getRepository(Location)
        .createQueryBuilder('location')
        .getMany()
}
