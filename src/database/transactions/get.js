import { getRealm } from '../index';
import { getRealmSync } from '../syncRealm';
import { captureException } from '~/helpers/errors/capture-exception';

export async function get({ schema, where, sortFieldName, shouldReverseSort, isSyncTransaction }) {
    try {
        const realm = isSyncTransaction ? await getRealmSync() : await getRealm();

        var objects;

        where ?
            objects = realm.objects(schema).filtered(where)
            :
            objects = realm.objects(schema);

        if (sortFieldName)//reversed == asc sort
            objects = objects.sorted(sortFieldName, shouldReverseSort);

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
