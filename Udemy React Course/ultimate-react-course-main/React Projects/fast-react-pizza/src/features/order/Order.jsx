// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import OrderItem from "./OrderItem";
import {
    calcMinutesLeft,
    formatCurrency,
    formatDate,
} from "../../utils/helpers";
import Emoji from "../../ui/Emoji";
import { useEffect } from "react";

export async function orderLoader({ params }) {
    const order = await getOrder(params.orderId);
    return order;
}

export default function Order() {
    const order = useLoaderData();
    const fetcher = useFetcher();

    useEffect(
        function () {
            if (fetcher.data === undefined && fetcher.state === "idle")
                fetcher.load("/menu");
        },
        [fetcher],
    );

    // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
    const {
        id,
        status,
        priority,
        priorityPrice,
        orderPrice,
        estimatedDelivery,
        cart,
    } = order;

    const deliveryIn = calcMinutesLeft(estimatedDelivery);
    const menuDataLoading = fetcher.state === "loading";
    const menuData = fetcher.data;

    return (
        <div className="space-y-8 px-4 py-6">
            <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="text-xl font-semibold">Order #{id}</h2>
                    <div className="space-x-2">
                        {priority && (
                            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
                                Priority
                            </span>
                        )}
                        <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
                            {status} order
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
                <p>
                    {deliveryIn >= 0 ? (
                        <>
                            Only {calcMinutesLeft(estimatedDelivery)} minutes
                            left <Emoji txt="😃" />
                        </>
                    ) : (
                        "Order should have arrived"
                    )}
                </p>
                <p className="text-xs text-stone-500">
                    (Estimated delivery: {formatDate(estimatedDelivery)})
                </p>
            </div>

            <ul className="divide-y divide-stone-200 border-b border-t">
                {cart.map(function (item) {
                    return (
                        <OrderItem
                            item={item}
                            key={item.pizzaId}
                            isLoadingIngredients={menuDataLoading}
                            ingredients={
                                !menuData
                                    ? []
                                    : menuData.find(
                                          (menuItem) =>
                                              menuItem.id === item.pizzaId,
                                      ).ingredients
                            }
                        />
                    );
                })}
            </ul>

            <div className="space-y-2 bg-stone-200 px-6 py-5">
                <p className="text-sm font-medium text-stone-500">
                    Price pizza: {formatCurrency(orderPrice)}
                </p>
                {priority && (
                    <p className="text-sm font-medium text-stone-500">
                        Price priority: {formatCurrency(priorityPrice)}
                    </p>
                )}
                <p>
                    To pay on delivery:{" "}
                    {formatCurrency(orderPrice + priorityPrice)}
                </p>
            </div>
        </div>
    );
}
