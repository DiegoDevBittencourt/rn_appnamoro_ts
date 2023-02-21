import { captureException } from '~/utils/error';
import { getRealmSync } from '../syncRealm';

export async function get({ schema, where, sortFieldName, shouldReverseSort }) {
    try {

        const realm = await getRealmSync();

        var objects;

        where ?
            objects = realm?.objects(schema)?.filtered(where)
            :
            objects = realm?.objects(schema);

        if (sortFieldName)//reversed == asc sort
            objects = objects?.sorted(sortFieldName, shouldReverseSort);

        let result = objects || null;

        return result;

    } catch (error) {
        console.warn(schema, where, sortFieldName, shouldReverseSort);
        captureException({
            error,
            errorCode: "D5A70C06"
        });
    }
}
