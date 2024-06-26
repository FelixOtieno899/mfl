<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title="Manage Local Purchase Orders">
                        <a-row>
                            <a-col
                                style="display: flex; justify-content: flex-end"
                                :span="24"
                            >
                                <a-button
                                    style="margin-top: -30px"
                                    type="primary"
                                    @click="showDrawer"
                                >
                                    <template #icon><PlusOutlined /></template>
                                    + Add New
                                </a-button>
                                <a-drawer
                                    title="Create New Local Purchase Order"
                                    :width="720"
                                    v-model:visible="open"
                                    :body-style="{ paddingBottom: '80px' }"
                                    :footer-style="{ textAlign: 'right' }"
                                    @close="onClose"
                                >
                                    <template v-if="isLoading">
                                        <a-space class="loading">
                                            <a-spin size="large" />
                                        </a-space>
                                    </template>

                                    <template v-else>
                                        <form :model="form" layout="vertical">
                                            <section class="wrapper-invoice">
                                                <!-- switch mode rtl by adding class rtl on invoice class -->
                                                <div class="invoice">
                                                    <div
                                                        class="invoice-information"
                                                    >
                                                        <p>
                                                            <b>Order Date</b>:
                                                            <a-date-picker
                                                                v-model:value="
                                                                    form.order_date
                                                                "
                                                                style="
                                                                    width: 30px;
                                                                    padding: 3px;
                                                                "
                                                                :get-popup-container="
                                                                    (trigger) =>
                                                                        trigger.parentElement
                                                                "
                                                            />
                                                        </p>
                                                        <p>
                                                            <b>Delivery Date</b>
                                                            :
                                                            <a-date-picker
                                                                v-model:value="
                                                                    form.delivery_date
                                                                "
                                                                style="
                                                                    width: 30px;
                                                                    padding: 3px;
                                                                "
                                                                :get-popup-container="
                                                                    (trigger) =>
                                                                        trigger.parentElement
                                                                "
                                                            />
                                                        </p>

                                                        <p>
                                                            REF_NO:
                                                            <input
                                                                class="input-data"
                                                                type="text"
                                                                v-model="
                                                                    form.reference_number
                                                                "
                                                            />
                                                        </p>

                                                        <p>
                                                            Status:
                                                            <select
                                                                v-model="
                                                                    form.status
                                                                "
                                                                class="custom-select"
                                                            >
                                                                <option
                                                                    value=""
                                                                >
                                                                    Select
                                                                    Status
                                                                </option>
                                                                <option
                                                                    value="Approved"
                                                                >
                                                                    Approved
                                                                </option>
                                                                <option
                                                                    value="Cancelled"
                                                                >
                                                                    Cancelled
                                                                </option>
                                                                <option
                                                                    value="Draft"
                                                                >
                                                                    Draft
                                                                </option>
                                                            </select>
                                                        </p>
                                                    </div>
                                                    <!-- logo brand invoice -->
                                                    <p>Purchase Order</p>
                                                    <div
                                                        class="invoice-logo-brand"
                                                    >
                                                        Supplier:
                                                        <select
                                                            v-model="
                                                                form.supplier_id
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option value="">
                                                                Choose Supplier
                                                            </option>
                                                            <option
                                                                v-for="supplier in suppliers"
                                                                :key="
                                                                    supplier.id
                                                                "
                                                                :value="
                                                                    supplier.id
                                                                "
                                                            >
                                                                {{
                                                                    supplier.name
                                                                }}
                                                            </option>
                                                        </select>
                                                    </div>

                                                    <div class="invoice-body">
                                                        <table class="table">
                                                            <thead>
                                                                <tr>
                                                                    <th>
                                                                        Item
                                                                        Description
                                                                    </th>
                                                                    <th>
                                                                        Quantity
                                                                    </th>
                                                                    <th>
                                                                        Unit
                                                                        Price
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr
                                                                    v-for="(
                                                                        item,
                                                                        index
                                                                    ) in lineItems"
                                                                    :key="index"
                                                                >
                                                                    <td>
                                                                        <textarea
                                                                            style="
                                                                                width: 200px;
                                                                                border-radius: 5px;
                                                                            "
                                                                            class=""
                                                                            type="text"
                                                                            v-model="
                                                                                item.itemDescription
                                                                            "
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <div
                                                                            style="
                                                                                display: flex;
                                                                                justify-content: space-between;
                                                                            "
                                                                        >
                                                                            <input
                                                                                style="
                                                                                    width: 40px;
                                                                                "
                                                                                class="input-data"
                                                                                type="text"
                                                                                v-model="
                                                                                    item.quantity
                                                                                "
                                                                            />
                                                                            <br />

                                                                            <select
                                                                                style="
                                                                                    border-radius: 5px;
                                                                                    width: 100px;
                                                                                    margin-left: 5px;
                                                                                "
                                                                                class=""
                                                                                v-model="
                                                                                    item.quantity_abbreviation_id
                                                                                "
                                                                            >
                                                                                <option
                                                                                    value=""
                                                                                >
                                                                                    Unit
                                                                                    of
                                                                                    Measure
                                                                                </option>
                                                                                <option
                                                                                    v-for="unit in unitsOfMeasures"
                                                                                    :key="
                                                                                        unit.id
                                                                                    "
                                                                                    :value="
                                                                                        unit.id
                                                                                    "
                                                                                >
                                                                                    {{
                                                                                        unit.name
                                                                                    }}
                                                                                </option>
                                                                            </select>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div
                                                                            style="
                                                                                display: flex;
                                                                                justify-content: space-between;
                                                                            "
                                                                        >
                                                                            <input
                                                                                style="
                                                                                    width: 80px;
                                                                                "
                                                                                class="input-data"
                                                                                type="text"
                                                                                v-model="
                                                                                    item.unit_price
                                                                                "
                                                                            />
                                                                            <select
                                                                                style="
                                                                                    border-radius: 5px;

                                                                                    width: 100px;
                                                                                    margin-left: 5px;
                                                                                "
                                                                                class=""
                                                                                v-model="
                                                                                    item.unit_price_abbreviation_id
                                                                                "
                                                                            >
                                                                                <option
                                                                                    value=""
                                                                                >
                                                                                    Unit
                                                                                    of
                                                                                    Measure
                                                                                </option>
                                                                                <option
                                                                                    v-for="unit in unitsOfMeasures"
                                                                                    :key="
                                                                                        unit.id
                                                                                    "
                                                                                    :value="
                                                                                        unit.id
                                                                                    "
                                                                                >
                                                                                    {{
                                                                                        unit.name
                                                                                    }}
                                                                                </option>
                                                                            </select>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <div
                                                            style="
                                                                margin-top: 15px;
                                                                display: flex;
                                                                justify-content: space-between;
                                                            "
                                                        >
                                                            <sdButton
                                                                size="small"
                                                                type="primary"
                                                                @click.prevent="
                                                                    addLineItem
                                                                "
                                                            >
                                                                + add New Line
                                                                Item
                                                            </sdButton>

                                                            <sdButton
                                                                size="small"
                                                                type="danger"
                                                                @click.prevent="
                                                                    removeLastLineItem
                                                                "
                                                            >
                                                                - remove Line
                                                                Item
                                                            </sdButton>
                                                        </div>

                                                        <!-- invoice total  -->
                                                        <!-- <div
                                                            class="invoice-total-amount"
                                                          >
                                                            <p>
                                                                Total :
                                                                <input
                                                                    class="input-data"
                                                                    type="text"
                                                                    v-model="
                                                                        form.total_amount
                                                                    "
                                                                />
                                                            </p>
                                                        </div> -->
                                                    </div>
                                                </div>
                                            </section>

                                            <div
                                                style="
                                                    margin-left: 30px;
                                                    margin-top: 40px;
                                                "
                                                class="setting-form-actions"
                                            >
                                                <sdButton
                                                    size="small"
                                                    type="primary"
                                                    @click.prevent="
                                                        handleSubmit
                                                    "
                                                >
                                                    Submit
                                                </sdButton>

                                                &nbsp; &nbsp;
                                                <sdButton
                                                    size="small"
                                                    @click.prevent="onClose"
                                                    type="light"
                                                >
                                                    Cancel
                                                </sdButton>
                                            </div>
                                        </form>
                                    </template>
                                </a-drawer>
                            </a-col>
                        </a-row>
                        <DataTables
                            :filterOption="true"
                            :filterOnchange="true"
                            :tableData="tableDataScource"
                            :columns="dataTableColumn"
                            :rowSelection="false"
                            @search="fetchLocalPurchaseOrders"
                        />
                    </sdCards>
                </BorderLessHeading>
            </a-col>
        </a-row>
    </Main>
</template>

<script>
import { DataService } from "@/config/dataService/dataService";
import { defineComponent, reactive, ref, onMounted } from "vue";
import { Main } from "../../../styled";
import DataTables from "@/components/table/DataTable.vue";
import { BorderLessHeading } from "../../../styled";
//import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export default defineComponent({
    name: "LocalPurchaseOrder",
    components: {
        Main,
        DataTables,
        BorderLessHeading,
    },
    setup() {
        //const { state } = useStore();
        const router = useRouter();
        const toast = useToast();

        const isLoading = ref(false);

        const unitsOfMeasures = ref([]);

        const suppliers = ref([]);

        // const states = ref([]);

        const invoices = ref([]);

        const lineItems = ref([
            {
                itemDescription: "",
                quantity: "",
                quantity_abbreviation_id: "",
                unit_price: "",
                unit_price_abbreviation_id: "",
            },
        ]);

        const addLineItem = () => {
            lineItems.value.push({
                itemDescription: "",
                quantity: "",
                quantity_abbreviation_id: "",

                unit_price: "",
                unit_price_abbreviation_id: "",
            });
            // updateSubtotalAndTotal(); // Update subtotal and total after adding a new line item
        };

        const tableDataScource = ref([]);

        const fetchAllData = async () => {
            await Promise.all([
                fetchLocalPurchaseOrders(),
                fetchSuppliers(),
                fetchInvoices(),
                fetchUnitsOfMeasures(),
            ]);
        };

        const fetchLocalPurchaseOrders = async (orderDate = null) => {
            try {
                let response;
                if (orderDate) {
                    // Call the searchCreditNote method if  IssueDate is provided
                    response = await searchLpos(orderDate);
                } else {
                    // Existing logic to fetch all lpos
                    response = await DataService.get("/lpo");
                    console.log("lpos fetched", response.data);
                    if (response.status === 200) {
                        if (Array.isArray(response.data.LPOs)) {
                            // Format the data to match the structure expected by DataTables
                            tableDataScource.value = response.data.LPOs.map(
                                (localpurchaseorder) => ({
                                    // id: `#${localpurchaseorder.id}`,
                                    key: localpurchaseorder.id,
                                    supplier: (
                                        <span class="ninjadash-username">
                                            {localpurchaseorder.supplier.name}
                                        </span>
                                    ),
                                    delivery_date: (
                                        <span>
                                            {localpurchaseorder.delivery_date}
                                        </span>
                                    ),
                                    order_date: (
                                        <span>
                                            {localpurchaseorder.order_date}
                                        </span>
                                    ),
                                    status: (
                                        <span
                                            class={`ninjadash-status ninjadash-status-${localpurchaseorder.status}`}
                                        >
                                            {localpurchaseorder.status}
                                        </span>
                                    ),
                                }),
                            );
                        } else {
                            // No drivers found, handle accordingly
                            tableDataScource.value = [];
                        }
                    } else {
                        return;
                        //toast.error("Failed to fetch drivers. Please try again.");
                    }
                }
            } catch (error) {
                console.error("Error fetching lpos:", error);
                toast.error("An error occurred. Please try again.");
            }
        };

        const searchLpos = async (orderDate) => {
            try {
                const response = await DataService.get(
                    `/lpo/search/${orderDate}`,
                );

                console.log("Searched lpo", response.data);
                if (
                    response.status === 200 &&
                    Array.isArray(response.data.LPOs)
                ) {
                    tableDataScource.value = response.data.LPOs.map(
                        (localpurchaseorder) => ({
                            // id: `#${localpurchaseorder.id}`,
                            key: localpurchaseorder.id,
                            supplier: (
                                <span class="ninjadash-username">
                                    {localpurchaseorder.supplier.name}
                                </span>
                            ),
                            delivery_date: (
                                <span>{localpurchaseorder.delivery_date}</span>
                            ),
                            order_date: (
                                <span>{localpurchaseorder.order_date}</span>
                            ),
                            status: (
                                <span
                                    class={`ninjadash-status ninjadash-status-${localpurchaseorder.status}`}
                                >
                                    {localpurchaseorder.status}
                                </span>
                            ),
                        }),
                    );
                } else {
                    tableDataScource.value = [];
                }
            } catch (error) {
                console.error("Error searching lpo:", error);
                toast.error("An error occurred. Please try again.");
            }
        };

        const fetchSuppliers = async () => {
            try {
                const response = await DataService.get("/suppliers");
                suppliers.value = response.data.Suppliers;
            } catch (error) {
                console.error("Error fetching suppliers:", error);
                suppliers.value = []; // Ensure it's always an array, even on error
            }
        };

        const fetchInvoices = async () => {
            try {
                const response = await DataService.get("/invoices");
                invoices.value = response.data.Invoices;
            } catch (error) {
                console.error("Error fetching invoices:", error);
                invoices.value = []; // Ensure it's always an array, even on error
            }
        };

        const fetchUnitsOfMeasures = async () => {
            try {
                const response3 = await DataService.get(`/units_of_measure`);
                console.log("Units of Measures fetched", response3.data);
                unitsOfMeasures.value = response3.data.Units;
            } catch (error) {
                console.error("Error fetching units of measures:", error);
                if (error.response3) {
                    console.error("Error response:", error.response3);
                }
            }
        };

        // const fetchCities = async () => {
        //     try {
        //         const response4 = await DataService.get(`/cities`);
        //         console.log("Cities fetched", response4.data);
        //         cities.value = response4.data.Cities;
        //     } catch (error) {
        //         console.error("Error fetching cities:", error);
        //         if (error.response4) {
        //             console.error("Error response:", error.response4);
        //         }
        //     }
        // };

        const viewLocalPurchaseOrder = (localPurchaseOrderId) => {
            router.push(`/app/local-purchase-order/${localPurchaseOrderId}`);
        };

        const editLocalPurchaseOrder = (localPurchaseOrderId) => {
            router.push(
                `/app/local-purchase-order/edit/${localPurchaseOrderId}`,
            );
        };
        const deleteLocalPurchaseOrder = async (localPurchaseOrderId) => {
            if (
                window.confirm(
                    "Are you sure you want to delete this local purchase order? This action cannot be undone.",
                )
            ) {
                try {
                    await DataService.delete(`/lpo/${localPurchaseOrderId}`);
                    toast.success(
                        "Local Purchase order  deleted successfully.",
                    );
                    await fetchLocalPurchaseOrders(); // Refresh the list
                } catch (error) {
                    toast.error(
                        "Failed to delete  local purchase order. Please try again.",
                    );
                }
            }
        };

        const dataTableColumn = [
            // {
            //     title: "Id",
            //     dataIndex: "id",
            //     key: "id",
            // },
            {
                title: "Supplier",
                dataIndex: "supplier",
                key: "user",
            },
            {
                title: "Delivery Date",
                dataIndex: "delivery_date",
                key: "coutry",
            },
            {
                title: "Order Date",
                dataIndex: "order_date",
                key: "order-date",
            },
            {
                title: "Status",
                dataIndex: "status",
                key: "status",
            },

            {
                title: "Actions",
                dataIndex: "action",
                key: "action",
                width: "90px",
                customRender: ({ record }) => {
                    return (
                        <div class="table-actions">
                            <button
                                class="view"
                                onClick={() =>
                                    viewLocalPurchaseOrder(record.key)
                                }
                            >
                                <unicon name="eye"></unicon>
                            </button>
                            <button
                                class="edit"
                                onClick={() =>
                                    editLocalPurchaseOrder(record.key)
                                }
                            >
                                <unicon name="edit"></unicon>
                            </button>
                            <button
                                class="delete"
                                onClick={() =>
                                    deleteLocalPurchaseOrder(record.key)
                                }
                            >
                                <unicon name="trash"></unicon>
                            </button>
                        </div>
                    );
                },
            },
        ];

        onMounted(async () => {
            await fetchAllData();
        });

        const form = reactive({
            reference_number: "",
            quantity: "",
            order_date: "",
            quantity_abbreviation_id: "",
            item: "",
            purchase_date: "",
            unit_price: "",
            unit_price_abbreviation_id: "",
            supplier_id: "",
            invoice_id: "",
            total_amount: "",
            status: "",
        });

        const handleFileUpload = (event, fieldName) => {
            const file = event.target.files[0];
            if (file) {
                form[fieldName] = file; // Update the form's state with the selected file
            }
        };

        console.log("Items to be submmited", form.value);

        const handleSubmit = async () => {
            // Check if all required fields are filled
            if (!form.order_date || !form.delivery_date || !form.supplier_id) {
                toast.error("Please fill in all required fields.");
                return; // Prevent form submission
            }

            for (let item of lineItems.value) {
                if (
                    !unitsOfMeasures.value.some(
                        (unit) => unit.id === item.quantity_abbreviation_id,
                    )
                ) {
                    toast.error(
                        "Please select quantity unit of measurement for all items.",
                    );
                    return; // Prevent form submission
                }
                if (
                    !unitsOfMeasures.value.some(
                        (unit) => unit.id === item.unit_price_abbreviation_id,
                    )
                ) {
                    toast.error(
                        "Please select unit price measurement for all items.",
                    );
                    return; // Prevent form submission
                }
            }

            const isValidSupplierSelected = suppliers.value.some(
                (supplier) => supplier.id === form.supplier_id,
            );
            if (!isValidSupplierSelected) {
                toast.error("Please select a valid supplier.");
                return; // Prevent form submission
            }

            // // Check if the selected state is valid
            // const selectedInvoice = invoices.value.find(
            //     (invoice) => invoice.id === form.invoice_id,
            // );
            // if (!selectedInvoice) {
            //     toast.error("Please select invoice.");
            //     return; // Prevent form submission
            // }

            // // Check if the selected city is valid
            // const selectedCity = cities.value.find(
            //     (city) => city.id === form.city_id,
            // );
            // if (!selectedCity) {
            //     toast.error("Please select city.");
            //     return; // Prevent form submission
            // }

            const formattedOrderDate = new Date(form.order_date)
                .toISOString()
                .split("T")[0];

            const formattedDeliveryDate = new Date(form.delivery_date)
                .toISOString()
                .split("T")[0];

            const formData = new FormData();

            // Append existing form fields
            //  formData.append("fuel_type", form.fuel_type);
            formData.append("quantity", form.quantity);
            formData.append(
                "quantity_abbreviation_id",
                form.quantity_abbreviation_id,
            );
            formData.append("purchase_date", form.purchase_date);
            formData.append("unit_price", form.unit_price);
            formData.append(
                "unit_price_abbreviation_id",
                form.unit_price_abbreviation_id,
            );
            formData.append("reference_number", form.reference_number);
            formData.append("supplier_id", form.supplier_id);
            if (form.order_date) {
                formData.append("order_date", formattedOrderDate);
            }

            if (form.delivery_date) {
                formData.append("delivery_date", formattedDeliveryDate);
            }

            formData.append("status", form.status);

            lineItems.value.forEach((item, index) => {
                formData.append(
                    `items[${index}][itemDescription]`,
                    item.itemDescription,
                );
                formData.append(`items[${index}][quantity]`, item.quantity);
                formData.append(`items[${index}][unit_price]`, item.unit_price);
                formData.append(
                    `items[${index}][quantity_abbreviation_id]`,
                    item.quantity_abbreviation_id,
                );
                formData.append(
                    `items[${index}][unit_price_abbreviation_id]`,
                    item.unit_price_abbreviation_id,
                );
            });

            try {
                isLoading.value = true;
                const response = await DataService.post("/lpo", formData);

                if (response.status === 201) {
                    // tableDataScource.value.push({
                    //     // id: `#${response.data.id}`,
                    //     key: response.data.Supplier.id,
                    //     name: (
                    //         <span class="ninjadash-username">
                    //             {response.data.Supplier.name}
                    //         </span>
                    //     ),
                    //     email: <span>{response.data.Supplier.email}</span>,
                    //     phone: <span>{response.data.Supplier.phone}</span>,
                    //     address: <span>{response.data.Supplier.address}</span>,

                    //     // status: (
                    //     //     <span
                    //     //         class={`ninjadash-status ninjadash-status-${response.data.status}`}
                    //     //     >
                    //     //         {response.data.status}
                    //     //     </span>
                    //     // ),
                    // });
                    toast.success("Record Added Successfully");
                    // Reset the form data to its initial state
                    form.reference_number = "";
                    form.quantity = "";
                    form.quantity_abbreviation_id = "";
                    form.purchase_date = "";
                    form.unit_price = "";
                    form.unit_price_abbreviation_id = "";
                    form.supplier_id = "";
                    form.invoice_id = "";

                    // Close the drawer
                    open.value = false;

                    await fetchLocalPurchaseOrders();

                    router.push({
                        path: "/app/local-purchase-order",
                    });
                } else {
                    //console.error("Record Add Failed");
                    toast.error("Failed to add record. Please try again.");
                }
            } catch (error) {
                console.error("Record Add error", error);
                toast.error("An error occurred. Please try again.");
            } finally {
                isLoading.value = false;
            }
        };

        const open = ref(false);
        const showDrawer = () => {
            open.value = true;
        };
        const onClose = () => {
            open.value = false;
        };

        const removeLastLineItem = () => {
            if (lineItems.value.length > 1) {
                lineItems.value.pop();
            } else {
                toast.warning("Cannot remove the last line item.");
            }
        };

        return {
            // data,
            // columns,
            // columnsPagination,
            tableDataScource,
            dataTableColumn,
            form,
            open,
            showDrawer,
            onClose,
            handleSubmit,
            isLoading,
            handleFileUpload,
            unitsOfMeasures,
            suppliers,
            invoices,
            addLineItem,
            lineItems,
            removeLastLineItem,
            fetchLocalPurchaseOrders,

            // handleCancel,
            // handlePreview,
            // fileList,
        };
    },
});
</script>

<style scoped>
.custom-select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding: 2px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f8f8f8;
    font-size: 12px;
    width: 120px;
    max-width: 300px; /* Adjust the width as needed */
}

.custom-select:focus {
    outline: none;
    border-color: #007bff; /* Change border color on focus */
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Add a subtle shadow on focus */
}

.wrapper-invoice {
    display: flex;
    justify-content: center;
}
.wrapper-invoice .invoice {
    height: auto;
    background: #fff;
    padding: 5vh;
    margin-top: 5vh;
    max-width: 110vh;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #dcdcdc;
}
.wrapper-invoice .invoice .invoice-information {
    float: right;
    text-align: right;
}
.wrapper-invoice .invoice .invoice-information b {
    color: "#0F172A";
}
.wrapper-invoice .invoice .invoice-information p {
    font-size: 2vh;
    color: gray;
}
.wrapper-invoice .invoice .invoice-logo-brand h2 {
    text-transform: uppercase;
    font-family:
        "Inter",
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Roboto,
        Oxygen,
        Ubuntu,
        Cantarell,
        "Open Sans",
        "Helvetica Neue",
        sans-serif;
    font-size: 2.9vh;
    color: "#0F172A";
}
.switch {
    position: relative;
    display: inline-block;
    margin-top: 20px;
    width: 28px;
    height: 12px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
}

.slider:before {
    position: absolute;
    content: "";
    height: 8px;
    width: 8px;
    left: 4px;
    bottom: 2.5px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
}

input:checked + .slider {
    background-color: #2196f3;
}

input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
}
input:checked + .slider:before {
    -webkit-transform: translateX(15px);
    -ms-transform: translateX(15px);
    transform: translateX(15px);
}

/* Rounded sliders */
.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}

.input-data {
    width: 150px;
    height: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 0.5px solid gray;
}
.wrapper-invoice .invoice .invoice-logo-brand img {
    max-width: 100px;
    width: 100%;
    object-fit: fill;
}
.wrapper-invoice .invoice .invoice-head {
    display: flex;
    margin-top: 8vh;
}
.wrapper-invoice .invoice .invoice-head .head {
    width: 100%;
    box-sizing: border-box;
}
.wrapper-invoice .invoice .invoice-head .client-info {
    text-align: left;
}
.wrapper-invoice .invoice .invoice-head .client-info h2 {
    font-weight: 500;
    letter-spacing: 0.3px;
    font-size: 2vh;
    color: "#0F172A";
}
.wrapper-invoice .invoice .invoice-head .client-info p {
    font-size: 2vh;
    color: gray;
}
.wrapper-invoice .invoice .invoice-head .client-data {
    text-align: right;
}
.wrapper-invoice .invoice .invoice-head .client-data h2 {
    font-weight: 500;
    letter-spacing: 0.3px;
    font-size: 2vh;
    color: "#0F172A";
}
.wrapper-invoice .invoice .invoice-head .client-data p {
    font-size: 2vh;
    color: gray;
}
.wrapper-invoice .invoice .invoice-body {
    margin-top: 8vh;
}
.wrapper-invoice .invoice .invoice-body .table {
    border-collapse: collapse;
    width: 100%;
}
.wrapper-invoice .invoice .invoice-body .table thead tr th {
    font-size: 2vh;
    border: 1px solid #dcdcdc;
    text-align: left;
    padding: 1vh;
    background-color: #eeeeee;
}
.wrapper-invoice .invoice .invoice-body .table tbody tr td {
    font-size: 2vh;
    border: 1px solid #dcdcdc;
    text-align: left;
    padding: 1vh;
    background-color: #fff;
}
.wrapper-invoice .invoice .invoice-body .table tbody tr td:nth-child(2) {
    text-align: right;
}
.wrapper-invoice .invoice .invoice-body .flex-table {
    display: flex;
}
.wrapper-invoice .invoice .invoice-body .flex-table .flex-column {
    width: 100%;
    box-sizing: border-box;
}
.wrapper-invoice
    .invoice
    .invoice-body
    .flex-table
    .flex-column
    .table-subtotal {
    border-collapse: collapse;
    box-sizing: border-box;
    width: 100%;
    margin-top: 2vh;
}
.wrapper-invoice
    .invoice
    .invoice-body
    .flex-table
    .flex-column
    .table-subtotal
    tbody
    tr
    td {
    font-size: 2vh;
    border-bottom: 1px solid #dcdcdc;
    text-align: left;
    padding: 1vh;
    background-color: #fff;
}
.wrapper-invoice
    .invoice
    .invoice-body
    .flex-table
    .flex-column
    .table-subtotal
    tbody
    tr
    td:nth-child(2) {
    text-align: right;
}
.wrapper-invoice .invoice .invoice-body .invoice-total-amount {
    margin-top: 1rem;
}
.wrapper-invoice .invoice .invoice-body .invoice-total-amount p {
    font-weight: bold;
    color: "#0F172A";
    text-align: right;
    font-size: 2vh;
}
.wrapper-invoice .invoice .invoice-footer {
    margin-top: 4vh;
}
.wrapper-invoice .invoice .invoice-footer p {
    font-size: 1.7vh;
    color: gray;
}

.copyright {
    margin-top: 2rem;
    text-align: center;
}
.copyright p {
    color: gray;
    font-size: 1.8vh;
}

@media print {
    .table thead tr th {
        -webkit-print-color-adjust: exact;
        background-color: #eeeeee !important;
    }

    .copyright {
        display: none;
    }
}
.rtl {
    direction: rtl;
    font-family:
        "Inter",
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Roboto,
        Oxygen,
        Ubuntu,
        Cantarell,
        "Open Sans",
        "Helvetica Neue",
        sans-serif;
}
.rtl .invoice-information {
    float: left !important;
    text-align: left !important;
}
.rtl .invoice-head .client-info {
    text-align: right !important;
}
.rtl .invoice-head .client-data {
    text-align: left !important;
}
.rtl .invoice-body .table thead tr th {
    text-align: right !important;
}
.rtl .invoice-body .table tbody tr td {
    text-align: right !important;
}
.rtl .invoice-body .table tbody tr td:nth-child(2) {
    text-align: left !important;
}
.rtl .invoice-body .flex-table .flex-column .table-subtotal tbody tr td {
    text-align: right !important;
}
.rtl
    .invoice-body
    .flex-table
    .flex-column
    .table-subtotal
    tbody
    tr
    td:nth-child(2) {
    text-align: left !important;
}
.rtl .invoice-body .invoice-total-amount p {
    text-align: left !important;
}
</style>
