<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title="Manage Fuel Purchase Orders">
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
                                    title="Create New Fuel Purchase Order"
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
                                        <a-form
                                            :model="form"
                                            @finish="handleSubmit"
                                            :rules="rules"
                                            layout="vertical"
                                        >
                                            <a-row :gutter="16">
                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Fuel Type"
                                                        name="fuel_type"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Please select fuel type!',
                                                            },
                                                        ]"
                                                    >
                                                        <select
                                                            v-model="
                                                                form.fuel_type
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option value="">
                                                                Select Fuel type
                                                            </option>
                                                            <option
                                                                value="
                                                                    Petrol
                                                                "
                                                            >
                                                                Petrol
                                                            </option>

                                                            <option
                                                                value="
                                                                Diesel
                                                            "
                                                            >
                                                                Diesel
                                                            </option>
                                                        </select>
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>
                                            <a-row :gutter="16">
                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Quantity"
                                                        name="quantity"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Enter quantity!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            v-model:value="
                                                                form.quantity
                                                            "
                                                            placeholder="Enter quantity"
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Quantity Measurement"
                                                        name="quantity_abbreviation_id"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Please select item!',
                                                            },
                                                        ]"
                                                    >
                                                        <select
                                                            v-model="
                                                                form.quantity_abbreviation_id
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option value="">
                                                                Select unit of
                                                                measurement
                                                            </option>
                                                            <option
                                                                v-for="unit in unitsOfMeasures"
                                                                :key="unit.id"
                                                                :value="unit.id"
                                                            >
                                                                {{ unit.name }}
                                                            </option>
                                                        </select>
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>
                                            <a-row :gutter="16">
                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Unit Price"
                                                        name="unit_price"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Please enter unit price!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.unit_price
                                                            "
                                                            placeholder="Enter Unit Price"
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Unit Price Measurement"
                                                        name="unit_price_abbreviation_id"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Please select item!',
                                                            },
                                                        ]"
                                                    >
                                                        <select
                                                            v-model="
                                                                form.unit_price_abbreviation_id
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option value="">
                                                                Select unit of
                                                                measurement
                                                            </option>
                                                            <option
                                                                v-for="unit in unitsOfMeasures"
                                                                :key="unit.id"
                                                                :value="unit.id"
                                                            >
                                                                {{ unit.name }}
                                                            </option>
                                                        </select>
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>
                                            <a-row>
                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Purchase Date"
                                                        name="purchase_date"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Please select date!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-date-picker
                                                            v-model:value="
                                                                form.purchase_date
                                                            "
                                                            style="width: 100%"
                                                            :get-popup-container="
                                                                (trigger) =>
                                                                    trigger.parentElement
                                                            "
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>

                                            <a-row :gutter="16">
                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Supplier"
                                                        name="supplier_id"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Please select item!',
                                                            },
                                                        ]"
                                                    >
                                                        <select
                                                            v-model="
                                                                form.supplier_id
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option value="">
                                                                Select Supplier
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
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Invoice No"
                                                        name="invoice_id"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Please select item!',
                                                            },
                                                        ]"
                                                    >
                                                        <select
                                                            v-model="
                                                                form.invoice_id
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option value="">
                                                                Select Invoice
                                                            </option>
                                                            <option
                                                                v-for="invoice in invoices"
                                                                :key="
                                                                    invoice.id
                                                                "
                                                                :value="
                                                                    invoice.id
                                                                "
                                                            >
                                                                {{ invoice.id }}
                                                            </option>
                                                        </select>
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>

                                            <a-row :gutter="16">
                                                <a-col :span="24">
                                                    <a-space align="end">
                                                        <a-button
                                                            @click="onClose"
                                                            >Cancel</a-button
                                                        >
                                                        <a-button
                                                            type="primary"
                                                            html-type="submit"
                                                            >Submit</a-button
                                                        >
                                                    </a-space>
                                                </a-col>
                                            </a-row>
                                        </a-form>
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
                            @search="fetchFuelPurchaseOrders"
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
    name: "FuelPurchaseOrder",
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

        const tableDataScource = ref([]);

        const fetchAllData = async () => {
            await Promise.all([
                fetchFuelPurchaseOrders(),
                fetchSuppliers(),
                fetchInvoices(),
                fetchUnitsOfMeasures(),
            ]);
        };

        const fetchFuelPurchaseOrders = async (purchaseDate = null) => {
            try {
                let response;
                if (purchaseDate) {
                    // Call the searchFuelPurchaseOrders method if  purchaseDate is provided
                    response = await searchFuelPurchaseOrders(purchaseDate);
                } else {
                    // Existing logic to fetch all invoices
                    response = await DataService.get("/fuel_purchase_order");
                    console.log("Fuel Purchase Orders fetched", response.data);
                    if (response.status === 200) {
                        if (Array.isArray(response.data.Fuel_purchase_orders)) {
                            // Format the data to match the structure expected by DataTables
                            tableDataScource.value =
                                response.data.Fuel_purchase_orders.map(
                                    (fuelpurchaseorder) => ({
                                        // id: `#${fuelpurchaseorder.id}`,
                                        key: fuelpurchaseorder.id,
                                        fuel_type: (
                                            <span class="ninjadash-username">
                                                {fuelpurchaseorder.fuel_type}
                                            </span>
                                        ),
                                        quantity: (
                                            <span>
                                                {fuelpurchaseorder.quantity}
                                            </span>
                                        ),
                                        supplier: (
                                            <span>
                                                {
                                                    fuelpurchaseorder.supplier
                                                        .name
                                                }
                                            </span>
                                        ),

                                        purchase_date: (
                                            <span>
                                                {
                                                    fuelpurchaseorder.purchase_date
                                                }
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
                console.error("Error fetching fuel purchase orders:", error);
                toast.error("An error occurred. Please try again.");
            }
        };

        const searchFuelPurchaseOrders = async (purchaseDate) => {
            try {
                const response = await DataService.get(
                    `/fuel_purchase_order/search/${purchaseDate}`,
                );

                console.log("Searched Fuel purchase order", response.data);
                if (
                    response.status === 200 &&
                    Array.isArray(response.data.Fuel_purchase_order)
                ) {
                    tableDataScource.value =
                        response.data.Fuel_purchase_order.map(
                            (fuelpurchaseorder) => ({
                                // id: `#${fuelpurchaseorder.id}`,
                                key: fuelpurchaseorder.id,
                                fuel_type: (
                                    <span class="ninjadash-username">
                                        {fuelpurchaseorder.fuel_type}
                                    </span>
                                ),
                                quantity: (
                                    <span>{fuelpurchaseorder.quantity}</span>
                                ),
                                supplier: (
                                    <span>
                                        {fuelpurchaseorder.supplier.name}
                                    </span>
                                ),
                                purchase_date: (
                                    <span>
                                        {fuelpurchaseorder.purchase_date}
                                    </span>
                                ),
                            }),
                        );
                } else {
                    tableDataScource.value = [];
                }
            } catch (error) {
                console.error("Error searching fuel purchase order:", error);
                toast.error("An error occurred. Please try again.");
            }
        };

        const fetchSuppliers = async () => {
            try {
                const response5 = await DataService.get(`/suppliers`);
                console.log("Supliers fetched", response5.data.Suppliers);
                suppliers.value = response5.data.Suppliers;
            } catch (error) {
                console.error("Error fetching suppliers:", error);
                if (error.response5) {
                    console.error("Error response:", error.response5);
                }
            }
        };

        const fetchInvoices = async () => {
            try {
                const response2 = await DataService.get(`/invoices`);
                console.log("Invoices fetched", response2.data.Invoices);
                invoices.value = response2.data.Invoices;
            } catch (error) {
                console.error("Error fetching invoices:", error);
                if (error.response2) {
                    console.error("Error response:", error.response2);
                }
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

        const viewFuelPurchaseOrder = (fuelPurchaseOrderId) => {
            router.push(`/app/fuel-purchase-order/${fuelPurchaseOrderId}`);
        };

        const editFuelPurchaseOrder = (fuelPurchaseOrderId) => {
            router.push(`/app/fuel-purchase-order/edit/${fuelPurchaseOrderId}`);
        };
        const deleteFuelPurchaseOrder = async (fuelPurchaseOrderId) => {
            if (
                window.confirm(
                    "Are you sure you want to delete this fuel purchase order? This action cannot be undone.",
                )
            ) {
                try {
                    await DataService.delete(
                        `/fuel_purchase_order/${fuelPurchaseOrderId}`,
                    );
                    toast.success("Fuel Purchase order  deleted successfully.");
                    await fetchFuelPurchaseOrders(); // Refresh the list
                } catch (error) {
                    toast.error(
                        "Failed to delete  fuel purchase order. Please try again.",
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
                title: "Fuel Type",
                dataIndex: "fuel_type",
                key: "user",
            },
            {
                title: "Quantity",
                dataIndex: "quantity",
                key: "coutry",
            },
            {
                title: "Supplier",
                dataIndex: "supplier",
                key: "supplier",
            },

            {
                title: "Purchase Date",
                dataIndex: "purchase_date",
                key: "purchase-date",
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
                                    viewFuelPurchaseOrder(record.key)
                                }
                            >
                                <unicon name="eye"></unicon>
                            </button>
                            <button
                                class="edit"
                                onClick={() =>
                                    editFuelPurchaseOrder(record.key)
                                }
                            >
                                <unicon name="edit"></unicon>
                            </button>
                            <button
                                class="delete"
                                onClick={() =>
                                    deleteFuelPurchaseOrder(record.key)
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
            fuel_type: "",
            quantity: "",
            quantity_abbreviation_id: "",
            purchase_date: "",
            unit_price: "",
            unit_price_abbreviation_id: "",
            supplier_id: "",
            invoice_id: "",
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
            if (
                !form.fuel_type ||
                !form.quantity ||
                !form.quantity_abbreviation_id ||
                !form.purchase_date ||
                !form.unit_price ||
                !form.unit_price_abbreviation_id ||
                !form.supplier_id ||
                !form.invoice_id
            ) {
                toast.error("Please fill in all required fields.");
                return; // Prevent form submission
            }

            // Check if the selected country is valid
            const selectedQtyUnit = unitsOfMeasures.value.find(
                (qtyUnit) => qtyUnit.id === form.quantity_abbreviation_id,
            );
            if (!selectedQtyUnit) {
                toast.error("Please select item.");
                return; // Prevent form submission
            }

            // Check if the selected country is valid
            const selectedUnitPrice = unitsOfMeasures.value.find(
                (unitPrice) => unitPrice.id === form.unit_price_abbreviation_id,
            );
            if (!selectedUnitPrice) {
                toast.error("Please select item.");
                return; // Prevent form submission
            }

            // Check if the selected country is valid
            const selectedSupplier = suppliers.value.find(
                (supplier) => supplier.id === form.supplier_id,
            );
            if (!selectedSupplier) {
                toast.error("Please select supplier.");
                return; // Prevent form submission
            }

            // Check if the selected state is valid
            const selectedInvoice = invoices.value.find(
                (invoice) => invoice.id === form.invoice_id,
            );
            if (!selectedInvoice) {
                toast.error("Please select invoice.");
                return; // Prevent form submission
            }

            // // Check if the selected city is valid
            // const selectedCity = cities.value.find(
            //     (city) => city.id === form.city_id,
            // );
            // if (!selectedCity) {
            //     toast.error("Please select city.");
            //     return; // Prevent form submission
            // }

            const formattedPurchaseDate = new Date(form.purchase_date)
                .toISOString()
                .split("T")[0];

            const formData = new FormData();

            // Append existing form fields
            formData.append("fuel_type", form.fuel_type);
            formData.append("quantity", form.quantity);
            formData.append(
                "quantity_abbreviation_id",
                form.quantity_abbreviation_id,
            );

            if (form.purchase_date) {
                formData.append("purchase_date", formattedPurchaseDate);
            }

            formData.append("unit_price", form.unit_price);
            formData.append(
                "unit_price_abbreviation_id",
                form.unit_price_abbreviation_id,
            );
            formData.append("supplier_id", form.supplier_id);
            formData.append("invoice_id", form.invoice_id);

            try {
                isLoading.value = true;
                const response = await DataService.post(
                    "/fuel_purchase_order",
                    formData,
                );

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
                    form.fuel_type = "";
                    form.quantity = "";
                    form.quantity_abbreviation_id = "";
                    form.purchase_date = "";
                    form.unit_price = "";
                    form.unit_price_abbreviation_id = "";
                    form.supplier_id = "";
                    form.invoice_id = "";

                    // Close the drawer
                    open.value = false;

                    await fetchFuelPurchaseOrders();

                    router.push({
                        path: "/app/fuel-purchase-order",
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
            fetchFuelPurchaseOrders,

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
    padding: 6px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f8f8f8;
    font-size: 16px;
    width: 100%;
    max-width: 300px; /* Adjust the width as needed */
}

.custom-select:focus {
    outline: none;
    border-color: #007bff; /* Change border color on focus */
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Add a subtle shadow on focus */
}
</style>
