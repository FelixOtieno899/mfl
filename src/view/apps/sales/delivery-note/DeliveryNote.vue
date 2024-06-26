<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title="Manage Delivery Notes">
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
                                    title="Create New Delivery Note"
                                    :width="720"
                                    v-model:visible="open"
                                    :body-style="{ paddingBottom: '80px' }"
                                    :footer-style="{ textAlign: 'right' }"
                                    @close="onClose"
                                >
                                    <template v-if="isLoading">
                                        <a-space>
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
                                                            <b>Delivery Date</b
                                                            >:
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
                                                                    value="
                                                                    delivered
                                                                "
                                                                >
                                                                    Delivered
                                                                </option>
                                                                <option
                                                                    value="
                                                                dispatched
                                                            "
                                                                >
                                                                    Dispatched
                                                                </option>
                                                                <option
                                                                    value="
                                                            on transit
                                                        "
                                                                >
                                                                    On Transit
                                                                </option>

                                                                <option
                                                                    value="
                                                        cancelled
                                                    "
                                                                >
                                                                    Cancelled
                                                                </option>

                                                                <option
                                                                    value="
                                                        draft
                                                    "
                                                                >
                                                                    Draft
                                                                </option>
                                                            </select>
                                                        </p>
                                                    </div>

                                                    <p
                                                        style="
                                                            margin-top: -30px;
                                                            margin-right: 30px;
                                                            font-weight: bold;
                                                        "
                                                    >
                                                        Delivery Note
                                                    </p>

                                                    <div
                                                        class="invoice-logo-brand"
                                                    >
                                                        <p>
                                                            Client:
                                                            <select
                                                                v-model="
                                                                    form.client_id
                                                                "
                                                                class="custom-select"
                                                            >
                                                                <option
                                                                    value=""
                                                                >
                                                                    Select
                                                                    Client
                                                                </option>
                                                                <option
                                                                    v-for="client in clients"
                                                                    :key="
                                                                        client.id
                                                                    "
                                                                    :value="
                                                                        client.id
                                                                    "
                                                                >
                                                                    {{
                                                                        client
                                                                            .user
                                                                            .first_name
                                                                    }}
                                                                </option>
                                                            </select>
                                                        </p>

                                                        <p>
                                                            Client Destination:
                                                            <select
                                                                v-model="
                                                                    form.client_destination_id
                                                                "
                                                                @change="
                                                                    handleDestinationChange
                                                                "
                                                                class="custom-select"
                                                            >
                                                                <option
                                                                    value=""
                                                                >
                                                                    Select
                                                                    Destination
                                                                </option>
                                                                <option
                                                                    v-for="coordinate in destinationsCoordinates"
                                                                    :key="
                                                                        coordinate.id
                                                                    "
                                                                    :value="
                                                                        coordinate.id
                                                                    "
                                                                >
                                                                    {{
                                                                        coordinate.coordinate
                                                                    }}
                                                                </option>
                                                            </select>
                                                        </p>
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
                                                                                height: 80px;
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
                                                                        <input
                                                                            class="input-data"
                                                                            type="text"
                                                                            v-model="
                                                                                item.quantity
                                                                            "
                                                                        />
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
                                                    </div>
                                                </div>
                                            </section>

                                            <div
                                                style="
                                                    margin-left: 50px;
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
                            @search="fetchDeliveryNotes"
                        />
                    </sdCards>
                </BorderLessHeading>
            </a-col>
        </a-row>
    </Main>
</template>

<script>
import { DataService } from "@/config/dataService/dataService";
import { defineComponent, reactive, ref, onMounted, watch } from "vue";
import { Main } from "../../../styled";
import DataTables from "@/components/table/DataTable.vue";
import { BorderLessHeading } from "../../../styled";
//import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export default defineComponent({
    name: "DeliveryNote",
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

        const clients = ref([]);
        const destinationsCoordinates = ref([]);
        const selectedDestination = ref(null);

        const clientDestinations = ref([]);

        const tableDataScource = ref([]);

        const fetchAllData = async () => {
            await Promise.all([
                fetchDeliveryNotes(),
                fetchClients(),
                fetchClientDestinations(),
            ]);
        };

        const fetchDeliveryNotes = async (deliveryDate = null) => {
            try {
                let response;
                if (deliveryDate) {
                    // Call the searchDrivers method if a nationalId is provided
                    response = await searchDeliveryNotes(deliveryDate);
                } else {
                    // Existing logic to fetch all invoices
                    response = await DataService.get("/delivery_note");
                    console.log("Delivery Notes fetched", response.data);
                    if (response.status === 200) {
                        if (Array.isArray(response.data.Delivery_notes)) {
                            // Format the data to match the structure expected by DataTables
                            tableDataScource.value =
                                response.data.Delivery_notes.map(
                                    (delivery) => ({
                                        // id: `#${supplier.id}`,
                                        key: delivery.id,
                                        client: (
                                            <span class="ninjadash-username">
                                                {
                                                    delivery.client.user
                                                        .first_name
                                                }
                                            </span>
                                        ),
                                        delivery_date: (
                                            <span class="ninjadash-username">
                                                {delivery.delivery_date}
                                            </span>
                                        ),

                                        status: (
                                            <span
                                                class={`ninjadash-status ninjadash-status-${delivery.status}`}
                                            >
                                                {delivery.status}
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
                console.error("Error fetching invoices:", error);
                toast.error("An error occurred. Please try again.");
            }
        };

        const searchDeliveryNotes = async (deliveryDate) => {
            try {
                const response = await DataService.get(
                    `/delivery_note/search/${deliveryDate}`,
                );

                console.log("Searched Delivery note", response.data);
                if (
                    response.status === 200 &&
                    Array.isArray(response.data.Delivery_notes)
                ) {
                    tableDataScource.value = response.data.Delivery_notes.map(
                        (delivery) => ({
                            key: delivery.id,
                            client: (
                                <span class="ninjadash-username">
                                    {delivery.client.user.first_name}
                                </span>
                            ),
                            delivery_date: (
                                <span class="ninjadash-username">
                                    {delivery.delivery_date}
                                </span>
                            ),

                            status: (
                                <span
                                    class={`ninjadash-status ninjadash-status-${delivery.status}`}
                                >
                                    {delivery.status}
                                </span>
                            ),
                        }),
                    );
                } else {
                    tableDataScource.value = [];
                }
            } catch (error) {
                console.error("Error searching delivery:", error);
                toast.error("An error occurred. Please try again.");
            }
        };

        const fetchClients = async () => {
            try {
                const response2 = await DataService.get(`/clients`);
                console.log("Clients fetched", response2.data);
                clients.value = response2.data.Clients;
            } catch (error) {
                console.error("Error fetching clients:", error);
                if (error.response2) {
                    console.error("Error response:", error.response2);
                }
            }
        };

        const fetchClientDestinations = async () => {
            try {
                const response2 = await DataService.get(
                    `/clients-destinations`,
                );
                console.log("Client Destinations fetched", response2.data);
                clientDestinations.value = response2.data.Client_destinations;
            } catch (error) {
                console.error(
                    "Error fetching client client Destinations:",
                    error,
                );
                if (error.response2) {
                    console.error("Error response:", error.response2);
                }
            }
        };

        const viewDeliveryNote = (deliveryNoteId) => {
            router.push(`/app/delivery-note/${deliveryNoteId}`);
        };

        const editDeliveryNote = (deliveryNoteId) => {
            router.push(`/app/delivery-note/edit/${deliveryNoteId}`);
        };
        const deleteDeliveryNote = async (deliveryNoteId) => {
            if (
                window.confirm(
                    "Are you sure you want to delete this delivery note? This action cannot be undone.",
                )
            ) {
                try {
                    await DataService.delete(
                        `/delivery_note/${deliveryNoteId}`,
                    );
                    toast.success("Delivery note deleted successfully.");
                    await fetchDeliveryNotes(); // Refresh the list
                } catch (error) {
                    toast.error(
                        "Failed to delete delivery notes. Please try again.",
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
                title: "Client",
                dataIndex: "client",
                key: "user",
            },
            {
                title: "Delivery Date",
                dataIndex: "delivery_date",
                key: "invoice",
            },

            {
                title: "Status",
                dataIndex: "status",
                key: "coutry",
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
                                onClick={() => viewDeliveryNote(record.key)}
                            >
                                <unicon name="eye"></unicon>
                            </button>
                            <button
                                class="edit"
                                onClick={() => editDeliveryNote(record.key)}
                            >
                                <unicon name="edit"></unicon>
                            </button>
                            <button
                                class="delete"
                                onClick={() => deleteDeliveryNote(record.key)}
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

        const lineItems = ref([
            {
                itemDescription: "",
                quantity: "",
                amount: "",
            },
        ]);

        // Function to add a new line item
        const addLineItem = () => {
            lineItems.value.push({
                itemDescription: "",
                quantity: "",
                amount: "",
            });
        };

        const form = reactive({
            client_id: "",
            delivery_date: "",
            status: "",
            //client_destination_name: "",
            client_destination_id: "",
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
            if (!form.client_id || !form.delivery_date) {
                toast.error("Please fill in all required fields.");
                return; // Prevent form submission
            }

            // Check if the selected client is valid
            const selectedClient = clients.value.find(
                (client) => client.id === form.client_id,
            );
            if (!selectedClient) {
                toast.error("Please select client.");
                return; // Prevent form submission
            }

            const formattedDeliveryDate = new Date(form.delivery_date)
                .toISOString()
                .split("T")[0];

            const formData = new FormData();

            // Append existing form fields
            formData.append("client_id", form.client_id);

            formData.append(
                "client_destination_id",
                form.client_destination_id,
            );
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
            });

            try {
                isLoading.value = true;
                const response = await DataService.post(
                    "/delivery_note",
                    formData,
                );

                console.log(
                    "Client response after post:",
                    response.data.Delivery_note,
                );

                if (response.status === 201) {
                    toast.success("Record Added Successfully");
                    // Reset the form data to its initial state
                    form.client_id = "";
                    form.delivery_date = "";

                    form.status = "";

                    form.client_destination_id = "";

                    // Close the drawer
                    open.value = false;

                    //Fetch Clients again to update the table data

                    await fetchDeliveryNotes();

                    router.push({ path: "/app/delivery-note" });
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

        // Watcher for client_id to update destinationsCoordinates
        watch(
            () => form.client_id,
            (newClientId) => {
                const selectedClient = clients.value.find(
                    (client) => client.id === newClientId,
                );
                if (selectedClient && selectedClient.client_destinations) {
                    destinationsCoordinates.value =
                        selectedClient.client_destinations.map(
                            (destination) => ({
                                id: destination.id,
                                coordinate: destination.destination_coordinates,
                            }),
                        );
                } else {
                    destinationsCoordinates.value = [];
                }
            },
        );

        // Method to handle destination selection change
        function handleDestinationChange(event) {
            const selectedDestinationId = event.target.value;
            if (selectedDestinationId) {
                selectedDestination.value = selectedDestinationId;
                form.client_destination_id = selectedDestinationId;
            }

            console.log(
                "id to be placed on client_destination_id",
                selectedDestinationId,
            );
        }

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
            clients,
            lineItems,
            addLineItem,
            removeLastLineItem,
            fetchDeliveryNotes,
            handleDestinationChange,
            destinationsCoordinates,

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

.borderless-input {
    border: none; /* Removes the border */
    outline: none; /* Removes the outline when focused */
    /* Add any additional styling as needed */
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
    margin-top: 12vh;
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
