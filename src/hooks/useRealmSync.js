import { useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch } from 'react-redux';

import { getRealmSync } from '~/database/syncRealm';
import { get } from '~/database/transactions';
import { captureException } from "@utils/error";
import { updateRealTimeMongodbChat } from '~/store/mongodb/reducer';

export default function useRealmSync() {

    const dispatch = useDispatch();

    function deleteObjects({ schema, id, where, realmSync }) {
        try {

            var objects;

            where ?
                objects = realmSync?.objects(schema)?.filtered(where)
                :
                objects = realmSync?.objects(schema);


            if (id) objects = objects.map((item) => item?.id == id && item);

            return realmSync.write(() => {
                realmSync.delete(objects);
            });
        } catch (error) {
            console.warn(schema, id, where);
            captureException({
                error,
                errorCode: "D5A85C06",
            });
        }
    }

    async function onRealmChange() {
        try {
            const partition_id = await AsyncStorage.getItem('@userId');

            if (partition_id) {
                const mongodb_chat = await get({ schema: 'chat' });
                dispatch(updateRealTimeMongodbChat(mongodb_chat || []));
            }
        } catch (error) {
            captureException({
                error,
                errorCode: "Q5A8HC0L",
            });
        }
    }

    useEffect(() => {

        let realmSync;

        async function instantiateRealmSync() {
            try {

                const partition_id = await AsyncStorage.getItem('@userId');

                if (partition_id) {
                    realmSync = await getRealmSync();
                    realmSync?.addListener("change", onRealmChange);
                }
            } catch (error) {
                console.error(`An exception was thrown within the change listener: ${error}`);
                captureException({
                    error,
                    errorCode: "S5A8GC0Y",
                });
            }
        }

        instantiateRealmSync();

        return () => {
            realmSync?.removeListener("change", onRealmChange);
        }
    }, []);

    return {
        onRealmChange
    }
}
