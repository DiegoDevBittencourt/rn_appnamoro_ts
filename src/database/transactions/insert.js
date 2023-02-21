import { captureException } from '~/utils/error';
import { getRealmSync } from '../syncRealm';

export async function insert({ schema, data }) {

    const realm = await getRealmSync();

    try {//the "modified" tag means that if the record already exists it will update, if not, will create
        realm?.write(() => {
            Array.isArray(data) ?
                data.map(item => realm?.create(schema, item, 'modified'))
                :
                realm?.create(schema, data, 'modified');
        });
    } catch (error) {
        console.warn('INSERT catch ' + ', ', schema + ', ', data);
        captureException({
            error,
            errorCode: "DFE31174"
        });
    }
}
