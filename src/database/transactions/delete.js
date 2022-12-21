import { getRealm } from '../index';
import { captureException } from '~/helpers/errors/capture-exception';
import { get } from '../transactions';

export async function deleteObjects({ schema, where, objectsToBeDeleted }) {

    try {
        const realm = await getRealm();

        if (objectsToBeDeleted != undefined && objectsToBeDeleted != []) {

            const finalObjects = objectsToBeDeleted?.length > 0 ? objectsToBeDeleted : [objectsToBeDeleted]

            realm.write(() => {
                realm.delete(finalObjects);
            });
        }
        else {
            let records;
            where ?
                records = await get({ schema, where })
                :
                records = await get({ schema });

            if (records?.length > 0) {
                realm.write(() => {
                    realm.delete(records);
                });
            }
        }

    } catch (error) {
        console.warn('DELETE catch ' + schema + ', ', where + ', ', objectsToBeDeleted);
        captureException({
            error,
            errorCode: "D5A85C06"
        });
    }
}
