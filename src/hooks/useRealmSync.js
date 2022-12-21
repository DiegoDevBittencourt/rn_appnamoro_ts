import { useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';

import { getRealmSync } from '~/database/syncRealm';
import { get } from '~/database/transactions';
import { setCartReservations, setCurrentReservation, setProductStock } from '~/store/modules/stock/actions';
import { captureException } from "@helpers/errors/capture-exception";
import { useCancelSale } from './useCancelSale';
import { RESERVATION_TIME_HAS_EXPIRED } from '~/constants/i18n/general';
import { recordsToJSON } from '~/helpers/database/recordsToJSON';

export default function useRealmSync() {

    const dispatch = useDispatch();
    const handleCancelSale = useCancelSale();

    const currentReservationRef = useRef(currentReservation);
    const cartReservationsRef = useRef(cartReservations);
    const { currentReservation, cartReservations } = useSelector(state => state.stock);

    useEffect(() => {
        cartReservationsRef.current = recordsToJSON(cartReservations);
    }, [cartReservations]);

    useEffect(() => {
        currentReservationRef.current = currentReservation;
    }, [currentReservation]);

    function deleteObjects({ schema, id, where, realmSync }) {
        try {

            var objects;

            where ?
                objects = realmSync.objects(schema).filtered(where)
                :
                objects = realmSync.objects(schema);


            if (id) objects = objects.map((item) => item.id == id && item);

            return realmSync.write(() => {
                realmSync.delete(objects);
            });
        } catch (error) {
            console.warn(schema, id, where);
            captureException({
                error,
                errorCode: "D5A85C06",
                context: "src/hooks/useRealmSync/deleteObjects",
            });
        }
    }

    async function onRealmChange() {
        try {
            // const menu_id = await AsyncStorage.getItem('@menu_id');
            // let cartReservations = cartReservationsRef?.current;

            // if (menu_id) {
            //     const product_stock = await get({ schema: 'product_stock', isSyncTransaction: true });
            //     const stock_history = await get({ schema: 'stock_history', isSyncTransaction: true });

            //     dispatch(setProductStock(product_stock));

            //     if (currentReservationRef?.current) {
            //         const updatedCurrentReservation = stock_history?.filter(item => item?._id == currentReservationRef?.current?._id)[0];
            //         updatedCurrentReservation && dispatch(setCurrentReservation(updatedCurrentReservation));
            //     }

            //     if (stock_history?.length > 0 && cartReservations?.length > 0) {
            //         const filteredStockHistory = stock_history?.filter((stockHistoryItem) => {
            //             return cartReservations?.some((reservation) => {
            //                 return stockHistoryItem?._id === reservation._id;
            //             });
            //         });

            //         if (filteredStockHistory?.length < cartReservations?.length) {
            //             dispatch(setCartReservations([]));
            //             handleCancelSale();

            //             showMessage({
            //                 type: "warning",
            //                 message: 't(RESERVATION_TIME_HAS_EXPIRED)',
            //             });
            //         }
            //     }
            // }
        } catch (error) {
            // captureException({
            //     error,
            //     errorCode: "Q5A8HC0L",
            //     context: "src/hooks/useRealmSync/onRealmChange",
            // });
        }
    }

    useEffect(() => {

        let realmSync;

        async function instantiateRealmSync() {
            try {

                const menu_id = await AsyncStorage.getItem('@menu_id');

                // if (menu_id) {
                realmSync = await getRealmSync();
                realmSync.addListener("change", onRealmChange);
                // }
            } catch (error) {
                console.error(`An exception was thrown within the change listener: ${error}`);
                captureException({
                    error,
                    errorCode: "S5A8GC0Y",
                    context: "src/hooks/useRealmSync/instantiateRealmSync",
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
