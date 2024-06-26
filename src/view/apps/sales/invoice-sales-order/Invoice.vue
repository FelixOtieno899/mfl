<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title="Manage Invoices">
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
                                    title="Create New Invoice"
                                    :width="900"
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
                                                            <b>Created Date</b>:
                                                            <a-date-picker
                                                                v-model:value="
                                                                    form.invoice_date
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
                                                            <b>Due Date</b> :
                                                            <a-date-picker
                                                                v-model:value="
                                                                    form.due_date
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
                                                            <b>Tax Date</b> :
                                                            <a-date-picker
                                                                v-model:value="
                                                                    form.tax_date
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

                                                        <!-- <p>
                                                            Due Payment:
                                                            <input
                                                                class="input-data"
                                                                type="text"
                                                                v-model="
                                                                    form.due_payment
                                                                "
                                                            />
                                                        </p> -->

                                                        <p>
                                                            LPO NO:
                                                            <select
                                                                v-model="
                                                                    form.lpo_no
                                                                "
                                                                class="custom-select"
                                                            >
                                                                <option
                                                                    value=""
                                                                >
                                                                    Select lpo
                                                                </option>
                                                                <option
                                                                    v-for="lpo in lpos"
                                                                    :key="
                                                                        lpo.id
                                                                    "
                                                                    :value="
                                                                        lpo.id
                                                                    "
                                                                >
                                                                    {{ lpo.id }}
                                                                </option>
                                                            </select>
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
                                                                        Approved
                                                                    "
                                                                >
                                                                    Approved
                                                                </option>
                                                                <option
                                                                    value="
                                                                    Rejected
                                                                "
                                                                >
                                                                    Rejected
                                                                </option>

                                                                <option
                                                                    value="
                                                            Draft
                                                        "
                                                                >
                                                                    Draft
                                                                </option>
                                                            </select>
                                                        </p>
                                                    </div>
                                                    <!-- logo brand invoice -->
                                                    <p>Bill To:</p>
                                                    <div
                                                        class="invoice-logo-brand"
                                                    >
                                                        Client:
                                                        <select
                                                            v-model="
                                                                form.client_id
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option value="">
                                                                Select Client
                                                            </option>
                                                            <option
                                                                v-for="client in clients"
                                                                :key="client.id"
                                                                :value="
                                                                    client.id
                                                                "
                                                            >
                                                                {{
                                                                    client.user
                                                                        .first_name
                                                                }}
                                                            </option>
                                                        </select>
                                                    </div>
                                                    <!-- invoice head -->
                                                    <div class="invoice-head">
                                                        <div
                                                            class="head client-info"
                                                        >
                                                            <h6>
                                                                Payment terms:
                                                            </h6>
                                                            <p>
                                                                <textarea
                                                                    style="
                                                                        width: 200px;
                                                                        height: 60px;
                                                                        border-radius: 5px;
                                                                    "
                                                                    class=""
                                                                    type="text"
                                                                    v-model="
                                                                        form.payment_terms
                                                                    "
                                                                />
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <!-- invoice body-->
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
                                                                        Amount(Ksh)
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
                                                                        <input
                                                                            class="input-data"
                                                                            type="text"
                                                                            v-model="
                                                                                item.quantity
                                                                            "
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <input
                                                                            class="input-data"
                                                                            type="text"
                                                                            v-model="
                                                                                item.amount
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
                                                        <div class="flex-table">
                                                            <div
                                                                class="flex-column"
                                                            ></div>
                                                            <div
                                                                class="flex-column"
                                                            >
                                                                <table
                                                                    class="table-subtotal"
                                                                >
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>
                                                                                Subtotal
                                                                            </td>
                                                                            <td>
                                                                                <input
                                                                                    class="input-data"
                                                                                    type="text"
                                                                                    v-model="
                                                                                        form.subtotal
                                                                                    "
                                                                                />
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <span
                                                                                    style="margin-top; -10px"
                                                                                >
                                                                                    VAT
                                                                                    16%</span
                                                                                >
                                                                                <label
                                                                                    class="switch"
                                                                                >
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        checked
                                                                                        v-model="
                                                                                            form.vat
                                                                                        "
                                                                                        @change="
                                                                                            updateSubtotalAndTotal
                                                                                        "
                                                                                    />
                                                                                    <span
                                                                                        class="slider round"
                                                                                    ></span>
                                                                                </label>
                                                                            </td>
                                                                            <td>
                                                                                <input
                                                                                    class="input-data"
                                                                                    v-model="
                                                                                        form.vat_amount
                                                                                    "
                                                                                />
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                        <!-- invoice total  -->
                                                        <div
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
                                                        </div>
                                                    </div>
                                                    <!-- invoice footer -->
                                                    <div class="invoice-footer">
                                                        Notes
                                                        <p>
                                                            <textarea
                                                                style="
                                                                    width: 250px;
                                                                    height: 60px;
                                                                    border-radius: 5px;
                                                                "
                                                                class=""
                                                                type="text"
                                                                v-model="
                                                                    form.notes
                                                                "
                                                            />
                                                        </p>
                                                    </div>
                                                </div>
                                            </section>

                                            <div
                                                style="
                                                    margin-left: 90px;
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
                            @search="fetchInvoices"
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
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export default defineComponent({
    name: "Invoice",
    components: {
        Main,
        DataTables,
        BorderLessHeading,
    },
    setup() {
        const router = useRouter();
        const toast = useToast();

        const isLoading = ref(false);
        const clients = ref([]);
        const lpos = ref([]);
        const tableDataScource = ref([]);

        const fetchAllData = async () => {
            await Promise.all([fetchInvoices(), fetchClients(), fetchLpos()]);
        };

        const fetchInvoices = async (invoiceDate = null) => {
            try {
                let response;
                if (invoiceDate) {
                    // Call the searchDrivers method if a nationalId is provided
                    response = await searchInvoices(invoiceDate);
                } else {
                    // Existing logic to fetch all invoices
                    response = await DataService.get("/invoices");
                    console.log("Invoices fetched", response.data);
                    if (response.status === 200) {
                        if (Array.isArray(response.data.Invoices)) {
                            // Format the data to match the structure expected by DataTables
                            tableDataScource.value = response.data.Invoices.map(
                                (invoice) => ({
                                    key: invoice.id,
                                    client: invoice.client.user.first_name,
                                    invoice_date: invoice.invoice_date,
                                    total_amount: invoice.total_amount,
                                    status: (
                                        <span
                                            class={`ninjadash-status ninjadash-status-${invoice.status}`}
                                        >
                                            {invoice.status}
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

        const searchInvoices = async (invoiceDate) => {
            try {
                const response = await DataService.get(
                    `/invoices/search/${invoiceDate}`,
                );
                if (
                    response.status === 200 &&
                    Array.isArray(response.data.Invoices)
                ) {
                    tableDataScource.value = response.data.Invoices.map(
                        (invoice) => ({
                            key: invoice.id,
                            client: invoice.client.user.first_name,
                            invoice_date: invoice.invoice_date,
                            total_amount: invoice.total_amount,
                            status: (
                                <span
                                    class={`ninjadash-status ninjadash-status-${invoice.status}`}
                                >
                                    {invoice.status}
                                </span>
                            ),
                        }),
                    );
                } else {
                    tableDataScource.value = [];
                }
            } catch (error) {
                console.error("Error searching invoice:", error);
                toast.error("An error occurred. Please try again.");
            }
        };

        const fetchClients = async () => {
            try {
                const response = await DataService.get(`/clients`);
                clients.value = response.data.Clients;
            } catch (error) {
                console.error("Error fetching clients:", error);
            }
        };

        const fetchLpos = async () => {
            try {
                const response = await DataService.get(`/lpo`);

                console.log("Lpos fetched", response.data.LPOs);
                lpos.value = response.data.LPOs;
            } catch (error) {
                console.error("Error fetching lpos:", error);
            }
        };

        const viewInvoice = (invoiceId) => {
            router.push(`/app/invoice-sales-order/${invoiceId}`);
        };

        const editInvoice = (invoiceId) => {
            router.push(`/app/invoice-sales-order/edit/${invoiceId}`);
        };

        const deleteInvoice = async (invoiceId) => {
            if (
                window.confirm(
                    "Are you sure you want to delete this invoice? This action cannot be undone.",
                )
            ) {
                try {
                    await DataService.delete(`/invoices/${invoiceId}`);
                    toast.success("Invoice  deleted successfully.");
                    await fetchInvoices(); // Refresh the list
                } catch (error) {
                    toast.error("Failed to delete invoice. Please try again.");
                }
            }
        };

        const dataTableColumn = [
            {
                title: "Client",
                dataIndex: "client",
                key: "user",
            },
            {
                title: "Invoice Date",
                dataIndex: "invoice_date",
                key: "invoice",
            },
            {
                title: "Total Amount",
                dataIndex: "total_amount",
                key: "total",
            },
            // {
            //     title: "Due Payment",
            //     dataIndex: "due_payment",
            //     key: "due",
            // },
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
                                onClick={() => viewInvoice(record.key)}
                            >
                                <unicon name="eye"></unicon>
                            </button>
                            <button
                                class="edit"
                                onClick={() => editInvoice(record.key)}
                            >
                                <unicon name="edit"></unicon>
                            </button>
                            <button
                                class="delete"
                                onClick={() => deleteInvoice(record.key)}
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
            client_id: "",
            invoice_date: "",
            total_amount: "",
            status: "",
            due_payment: "",
            payment_status: "",
            item_description: "",
            quantity: "",
            vat: false, // Initialize VAT toggle
            vat_amount: 0, // Initialize VAT amount
            subtotal: 0, // Initialize subtotal
            notes: "",
            due_date: "",
            tax_date: "",
            payment_terms: "",
            lpo_no: "",
        });

        const handleFileUpload = (event, fieldName) => {
            const file = event.target.files[0];
            if (file) {
                form[fieldName] = file;
            }
        };

        const handleSubmit = async () => {
            if (!form.client_id || !form.invoice_date) {
                toast.error("Please fill in all required fields.");
                return;
            }

            const formattedInvoiceDate = new Date(form.invoice_date)
                .toISOString()
                .split("T")[0];

            const formattedDueDate = new Date(form.due_date)
                .toISOString()
                .split("T")[0];

            const formattedTaxDate = new Date(form.tax_date)
                .toISOString()
                .split("T")[0];

            const formData = new FormData();

            formData.append("client_id", form.client_id);

            if (form.invoice_date) {
                formData.append("invoice_date", formattedInvoiceDate);
            }

            formData.append("total_amount", form.total_amount);
            formData.append("subtotal", form.subtotal);
            formData.append("vat_amount", form.vat_amount);
            formData.append("vat", form.vat);
            formData.append("status", form.status);
            formData.append("due_payment", form.due_payment);
            formData.append("payment_status", form.payment_status);
            formData.append("notes", form.notes);

            if (form.due_date) {
                formData.append("due_date", formattedDueDate);
            }

            if (form.tax_date) {
                formData.append("tax_date", formattedTaxDate);
            }

            formData.append("payment_terms", form.payment_terms);
            formData.append("lpo_no", form.lpo_no);

            lineItems.value.forEach((item, index) => {
                formData.append(
                    `items[${index}][itemDescription]`,
                    item.itemDescription,
                );
                formData.append(`items[${index}][quantity]`, item.quantity);
                formData.append(`items[${index}][amount]`, item.amount);
            });

            try {
                isLoading.value = true;
                const response = await DataService.post("/invoices", formData);

                if (response.status === 201) {
                    toast.success("Record Added Successfully");
                    // Reset form fields
                    resetForm();
                    // Close the drawer
                    open.value = false;
                    // Fetch invoices again to update the table data
                    await fetchInvoices();
                    router.push({ path: "/app/invoice-sales-order" });
                } else {
                    toast.error("Failed to add record. Please try again.");
                }
            } catch (error) {
                console.error("Record Add error", error);
                toast.error("An error occurred. Please try again.");
            } finally {
                isLoading.value = false;
            }
        };

        const resetForm = () => {
            form.client_id = "";
            form.invoice_date = "";
            form.total_amount = "";
            form.subtotal = "";
            form.vat_amount = "";
            form.due_payment = "";
            form.due_date = "";
            form.tax_date = "";
            form.item_description = "";
            form.quantity = "";
            form.payment_terms = "";
            form.notes = "";
            form.lpo_no = "";
        };

        const open = ref(false);
        const showDrawer = () => {
            open.value = true;
        };
        const onClose = () => {
            open.value = false;
        };

        const checked = ref(false);

        const lineItems = ref([
            {
                itemDescription: "",
                quantity: "",
                amount: "",
            },
        ]);

        const updateSubtotalAndTotal = () => {
            console.log("Updating subtotal and total");
            // Calculate subtotal
            form.subtotal = lineItems.value.reduce((total, item) => {
                return total + parseFloat(item.amount || 0);
            }, 0);

            // Calculate VAT if toggled
            form.vat && (form.vat_amount = form.subtotal * 0.16);

            // Calculate total
            form.total_amount =
                form.subtotal + (form.vat ? form.vat_amount : 0);
        };

        // Watch for changes in line items
        watch(lineItems, updateSubtotalAndTotal, { deep: true });

        // Function to add a new line item
        const addLineItem = () => {
            lineItems.value.push({
                itemDescription: "",
                quantity: "",
                amount: "",
            });
            updateSubtotalAndTotal(); // Update subtotal and total after adding a new line item
        };

        const removeLastLineItem = () => {
            if (lineItems.value.length > 1) {
                lineItems.value.pop();
            } else {
                toast.warning("Cannot remove the last line item.");
            }
        };

        return {
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
            checked,
            lineItems,
            addLineItem,
            updateSubtotalAndTotal,
            removeLastLineItem,
            lpos,
            fetchInvoices,
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
