<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title="Manage Credit Notes">
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
                                    title="Create New Credit Note"
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
                                                            <b>Date Issued</b>:
                                                            <a-date-picker
                                                                v-model:value="
                                                                    form.issue_date
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

                                                        Credit Amount:
                                                        <input
                                                            class="input-data"
                                                            type="text"
                                                            v-model="
                                                                form.credit_amount
                                                            "
                                                        />
                                                    </div>

                                                    <p
                                                        style="
                                                            margin-top: -30px;
                                                            margin-right: 30px;
                                                            font-weight: bold;
                                                        "
                                                    >
                                                        Credit Note
                                                    </p>

                                                    <div
                                                        class="invoice-logo-brand"
                                                    >
                                                        Invoice:
                                                        <select
                                                            v-model="
                                                                form.invoice_id
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option value="">
                                                                Select reference
                                                                No
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
                                                    </div>

                                                    <div class="invoice-footer">
                                                        Description:
                                                        <p>
                                                            <textarea
                                                                style="
                                                                    width: 250px;
                                                                    border-radius: 5px;
                                                                    height: 80px;
                                                                "
                                                                class=""
                                                                type="text"
                                                                v-model="
                                                                    form.reason
                                                                "
                                                            />
                                                        </p>
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
                            @search="fetchCreditNotes"
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
    name: "CreditNote",
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

        const invoices = ref([]);

        const tableDataScource = ref([]);

        const fetchAllData = async () => {
            await Promise.all([fetchCreditNotes(), fetchInvoices()]);
        };

        const fetchCreditNotes = async (issueDate = null) => {
            try {
                let response;
                if (issueDate) {
                    // Call the searchCreditNote method if  IssueDate is provided
                    response = await searchCreditNotes(issueDate);
                } else {
                    // Existing logic to fetch all invoices
                    response = await DataService.get("/credit_note");
                    console.log("Credit Notes fetched", response.data);
                    if (response.status === 200) {
                        if (Array.isArray(response.data.Credit_notes)) {
                            // Format the data to match the structure expected by DataTables
                            tableDataScource.value =
                                response.data.Credit_notes.map((credit) => ({
                                    // id: `#${supplier.id}`,
                                    key: credit.id,
                                    invoice_reference: (
                                        <span class="ninjadash-username">
                                            {credit.invoice.id}
                                        </span>
                                    ),
                                    credit_amount: (
                                        <span class="ninjadash-username">
                                            {credit.credit_amount}
                                        </span>
                                    ),

                                    issue_date: (
                                        <span class="ninjadash-username">
                                            {credit.issue_date}
                                        </span>
                                    ),

                                    // status: (
                                    //     <span
                                    //         class={`ninjadash-status ninjadash-status-${delivery.status}`}
                                    //     >
                                    //         {delivery.status}
                                    //     </span>
                                    // ),
                                }));
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
                console.error("Error fetching credit notes:", error);
                toast.error("An error occurred. Please try again.");
            }
        };

        const searchCreditNotes = async (issueDate) => {
            try {
                const response = await DataService.get(
                    `/credit_note/search/${issueDate}`,
                );

                console.log("Searched Credit note", response.data);
                if (
                    response.status === 200 &&
                    Array.isArray(response.data.Credit_notes)
                ) {
                    tableDataScource.value = response.data.Credit_notes.map(
                        (credit) => ({
                            // id: `#${supplier.id}`,
                            key: credit.id,
                            invoice_reference: (
                                <span class="ninjadash-username">
                                    {credit.invoice.id}
                                </span>
                            ),
                            credit_amount: (
                                <span class="ninjadash-username">
                                    {credit.credit_amount}
                                </span>
                            ),

                            issue_date: (
                                <span class="ninjadash-username">
                                    {credit.issue_date}
                                </span>
                            ),

                            // status: (
                            //     <span
                            //         class={`ninjadash-status ninjadash-status-${delivery.status}`}
                            //     >
                            //         {delivery.status}
                            //     </span>
                            // ),
                        }),
                    );
                } else {
                    tableDataScource.value = [];
                }
            } catch (error) {
                console.error("Error searching credit note:", error);
                toast.error("An error occurred. Please try again.");
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

        const viewCreditNote = (creditNoteId) => {
            router.push(`/app/credit-note/${creditNoteId}`);
        };

        const editCreditNote = (creditNoteId) => {
            router.push(`/app/credit-note/edit/${creditNoteId}`);
        };
        const deleteCreditNote = async (creditNoteId) => {
            if (
                window.confirm(
                    "Are you sure you want to delete this credit note? This action cannot be undone.",
                )
            ) {
                try {
                    await DataService.delete(`/credit_note/${creditNoteId}`);
                    toast.success("Credit note deleted successfully.");
                    await fetchCreditNotes(); // Refresh the list
                } catch (error) {
                    toast.error(
                        "Failed to delete credit notes. Please try again.",
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
                title: "Invoice Ref Number",
                dataIndex: "invoice_reference",
                key: "user",
            },
            {
                title: "Credit Amount",
                dataIndex: "credit_amount",
                key: "credit",
            },

            {
                title: "Date issued",
                dataIndex: "issue_date",
                key: "country",
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
                                onClick={() => viewCreditNote(record.key)}
                            >
                                <unicon name="eye"></unicon>
                            </button>
                            <button
                                class="edit"
                                onClick={() => editCreditNote(record.key)}
                            >
                                <unicon name="edit"></unicon>
                            </button>
                            <button
                                class="delete"
                                onClick={() => deleteCreditNote(record.key)}
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
            invoice_id: "",
            credit_amount: "",
            issue_date: "",
            reason: "",
            created_by: "",
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
                !form.invoice_id ||
                !form.issue_date ||
                !form.credit_amount ||
                !form.reason
            ) {
                toast.error("Please fill in all required fields.");
                return; // Prevent form submission
            }

            // Check if the selected country is valid
            const selectedInvoice = invoices.value.find(
                (invoice) => invoice.id === form.invoice_id,
            );
            if (!selectedInvoice) {
                toast.error("Please select item!");
                return; // Prevent form submission
            }

            const formattedIssueDate = new Date(form.issue_date)
                .toISOString()
                .split("T")[0];

            const formData = new FormData();

            // Append existing form fields
            formData.append("invoice_id", form.invoice_id);
            if (form.issue_date) {
                formData.append("issue_date", formattedIssueDate);
            }

            formData.append("credit_amount", form.credit_amount);
            formData.append("reason", form.reason);
            formData.append("created_by", form.created_by);

            try {
                isLoading.value = true;
                const response = await DataService.post(
                    "/credit_note",
                    formData,
                );

                console.log(
                    "Credit response after post:",
                    response.data.Credit_note,
                );

                if (response.status === 201) {
                    toast.success("Record Added Successfully");
                    // Reset the form data to its initial state
                    form.invoice_id = "";
                    form.credit_amount = "";
                    form.issue_date = "";
                    form.reason = "";

                    // Close the drawer
                    open.value = false;

                    //Fetch Clients again to update the table data

                    await fetchCreditNotes();

                    router.push({ path: "/app/credit-note" });
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
            clients,
            lineItems,
            addLineItem,
            removeLastLineItem,
            invoices,
            fetchCreditNotes,

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
    margin-top: 8vh;
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
