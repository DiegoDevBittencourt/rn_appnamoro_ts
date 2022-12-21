import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";

import useRealmSync from "~/hooks/useRealmSync";

const { Navigator, Screen } = createStackNavigator();
const RootStack = createStackNavigator();

const MainNavigator = () => {

  const dispatch = useDispatch();
  const { onRealmChange } = useRealmSync();
  const { connectBlacklist } = useBlackList();
  const { signed } = useSelector((state) => state.auth);
  const activationCode = useSelector((state) => state?.pos?.options?.activation_code);

  const paymentMethods = useGetSectorPaymentMethods();

  useEffect(() => {
    onRealmChange();
  }, []);

  useEffect(() => {
    try {
      const isActivedCashless = paymentMethods.filter(
        (p) => p.name === "CASHLESS"
      );

      if (isActivedCashless.length > 0 && isActivedCashless[0].active) {
        connectBlacklist();
      }
    } catch (error) { }
  }, [paymentMethods]);

  useEffect(() => {
    try {
      dispatch(setIsQuickPayment(false));

      if (DEVICE === POS_DEVICE) {
        PlugPagServicePdv.setAppIdendification();

        if (activationCode) {
          const activationResponse =
            PlugPagServicePdv.initializeAndActivatePinpad(activationCode);
          if (activationResponse === -1)
            throw new Error("Failed to initialize");
        }
      }
    } catch (error) {
      if (activationCode) {
        PlugPagServicePdv.initializeAndActivatePinpad(activationCode);
      }
      throw new Error("Failed: " + error);
    }
  }, [activationCode]);

  return (
    <>
      <Navigator screenOptions={mainNavigatorOptions}>
        {
          !signed ?
            <>
              <Screen
                name="Sync"
                component={SyncScreen}
                options={signInOptions}
              />
              <Screen
                name="SignIn"
                component={SignInScreen}
                options={signInOptions}
              />
            </>
            :
            <Screen
              name="AuthRoutes"
              component={AuthRoutes}
              options={authRoutesOptions}
            />
        }
      </Navigator>

      <AuthenticateManagerOrSupervisorModal />
      <OverlayMessage />
      <ConfirmConsumptionSheetPrintAlert />
      <ConfirmPrintContribution />
      <ConfirmPrintPickUp />
      <ConfirmPrintCashierAlert />
    </>
  );
};

const RootStackNavigator = () => {
  return (
    <RootStack.Navigator mode={"modal"} headerMode={"none"}>
      <RootStack.Screen name="MainNavigator" component={MainNavigator} />
      <RootStack.Screen
        options={modalOptions}
        name="SaleProductsListModal"
        component={SaleProductsListModal}
      />
      <RootStack.Screen
        options={modalOptions}
        name="AddProductsToCartModal"
        component={AddProductsToCartModal}
      />
      <RootStack.Screen
        options={modalOptions}
        name="StockQuantityModal"
        component={StockQuantityModal}
      />
      <RootStack.Screen
        options={modalOptions}
        name="SaleReversalOptionsModal"
        component={SaleReversalOptionsModal}
      />
      <RootStack.Screen
        options={modalOptions}
        name="SalePaymentsListModal"
        component={SalePaymentsListModal}
      />
      <RootStack.Screen
        options={modalOptions}
        name="SaleCancelTransactionModal"
        component={SaleCancelTransactionModal}
      />
      <RootStack.Screen
        options={modalOptions}
        name="SaleCancelOrReprintModal"
        component={SaleCancelOrReprintModal}
      />
      <RootStack.Screen
        options={modalOptions}
        name="InstallmentsModal"
        component={InstallmentsModal}
      />
      <RootStack.Screen
        options={modalOptions}
        name="InfoModal"
        component={InfoModal}
      />
      <RootStack.Screen
        options={modalOptions}
        name="ReadCashlessCardModal"
        component={ReadCashlessCardModal}
      />
      <RootStack.Screen
        options={modalOptions}
        name="CashlessSuccessModal"
        component={CashlessSuccessModal}
      />
    </RootStack.Navigator>
  );
};

export default function Application() {
  return <RootStackNavigator />;
}
