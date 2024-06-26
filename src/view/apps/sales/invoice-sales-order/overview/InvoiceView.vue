<template>
    <sdCards>
        <template v-slot:title>
            <div style="margin-left: 168px" class="setting-card-title">
                <sdHeading as="h4">Invoice Info</sdHeading>
            </div>

            <form :model="form" layout="vertical">
                <section class="wrapper-invoice">
                    <!-- switch mode rtl by adding class rtl on invoice class -->
                    <div class="invoice">
                        <div
                            style="margin-left: 200px"
                            class="invoice-information"
                        >
                            <p style="">
                                <b>Invoice No:</b>
                                <input
                                    style="
                                        border: none;
                                        outline: none;
                                        width: 85px;
                                    "
                                    v-model="formState.invoice_id"
                                    readonly
                                    class="input-data"
                                />
                            </p>
                            <p>
                                <b>Created Date</b>:
                                <input
                                    style="
                                        border: none;
                                        outline: none;
                                        width: 85px;
                                    "
                                    v-model="formState.invoice_date"
                                    class="input-data"
                                    readonly
                                />
                            </p>
                            <p>
                                <b>Due Date</b> :
                                <input
                                    style="
                                        border: none;
                                        outline: none;
                                        width: 85px;
                                    "
                                    v-model="formState.due_date"
                                    class="input-data"
                                    readonly
                                />
                            </p>

                            <p>
                                <b>Tax Date</b> :
                                <input
                                    style="
                                        border: none;
                                        outline: none;
                                        width: 85px;
                                    "
                                    v-model="formState.tax_date"
                                    class="input-data"
                                    readonly
                                />
                            </p>
                        </div>
                        <!-- logo brand invoice -->
                        <p>Bill To:</p>
                        <div class="">
                            <span style="font-size: 2vh; color: gray">
                                Client:</span
                            >
                            <input
                                style="
                                    font-size: 12px;
                                    border: none;
                                    outline: none;
                                "
                                v-model="formState.client_name"
                                readonly
                                class="input-data"
                            />
                        </div>
                        <div>
                            <span style="font-size: 2vh; color: gray"
                                >Client Pin:</span
                            >
                            <input
                                style="
                                    font-size: 12px;
                                    border: none;
                                    outline: none;
                                "
                                v-model="formState.client_pin_no"
                                readonly
                                class="input-data"
                            />
                        </div>

                        <div>
                            <span style="font-size: 2vh; color: gray"
                                >Email:</span
                            >
                            <input
                                style="
                                    font-size: 12px;
                                    border: none;
                                    outline: none;
                                "
                                v-model="formState.email"
                                readonly
                                class="input-data"
                            />
                        </div>
                        <!-- invoice head -->
                        <div class="invoice-head">
                            <div class="head client-info">
                                <h6>Payment terms:</h6>
                                <p>
                                    <textarea
                                        style="width: 200px; border-radius: 5px"
                                        class="borderless-input"
                                        type="text"
                                        v-model="formState.payment_terms"
                                        readonly
                                    />
                                </p>
                            </div>
                        </div>
                        <!-- invoice body-->
                        <div class="invoice-body">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Item Description</th>
                                        <th>Quantity</th>
                                        <th>Amount(Ksh)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="(item, index) in lineItems"
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
                                                v-model="item.itemDescription"
                                                readonly
                                            />
                                        </td>
                                        <td>
                                            <input
                                                class="input-data"
                                                type="text"
                                                v-model="item.quantity"
                                                readonly
                                            />
                                        </td>
                                        <td>
                                            <input
                                                class="input-data"
                                                type="text"
                                                v-model="item.amount"
                                                readonly
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <div class="flex-table">
                                <div class="flex-column"></div>
                                <div class="flex-column">
                                    <table class="table-subtotal">
                                        <tbody>
                                            <tr>
                                                <td>Subtotal</td>
                                                <td>
                                                    <input
                                                        class="input-data"
                                                        type="text"
                                                        v-model="
                                                            formState.subtotal
                                                        "
                                                        readonly
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span
                                                        style="margin-top; -10px"
                                                    >
                                                        VAT 16%</span
                                                    >
                                                    <label class="switch">
                                                        <!-- <input
                                                            type="checkbox"
                                                            checked
                                                            v-model="
                                                                formState.vat
                                                            "
                                                            @change="
                                                                updateSubtotalAndTotal
                                                            "
                                                            readonly
                                                        /> -->
                                                        <!-- <span
                                                            class="slider round"
                                                        ></span> -->
                                                    </label>
                                                </td>
                                                <td>
                                                    <input
                                                        class="input-data"
                                                        v-model="
                                                            formState.vat_amount
                                                        "
                                                        readonly
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <!-- invoice total  -->
                            <div class="invoice-total-amount">
                                <p>
                                    Total :
                                    <input
                                        class="input-data"
                                        type="text"
                                        v-model="formState.total_amount"
                                        readonly
                                    />
                                </p>
                            </div>
                        </div>
                        <!-- invoice footer -->
                        <div class="invoice-footer">
                            Notes
                            <p>
                                <textarea
                                    style="width: 250px; border-radius: 5px"
                                    class="borderless-input"
                                    type="text"
                                    v-model="formState.notes"
                                    readonly
                                />
                            </p>
                        </div>
                    </div>
                </section>

                <div
                    style="margin-left: 180px; margin-top: 40px"
                    class="setting-form-actions"
                >
                    <sdButton
                        size="small"
                        type="primary"
                        @click.prevent="handleSubmit"
                    >
                        Submit
                    </sdButton>

                    &nbsp; &nbsp;
                    <sdButton
                        size="small"
                        @click.prevent="handleCancel"
                        type="light"
                    >
                        Cancel
                    </sdButton>
                </div>
            </form>
        </template>
    </sdCards>
</template>

<script>
import { DataService } from "@/config/dataService/dataService";
//import { BasicFormWrapper } from "../../../../styled";
import { defineComponent, ref, reactive, onMounted, watch } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const InvoiceView = defineComponent({
    name: "InvoiceView",
    //components: { BasicFormWrapper },
    props: ["id"], // Accept the id prop

    setup(props) {
        const router = useRouter();
        const toast = useToast();
        const isLoading = ref(false);
        const checked = ref(true);

        const lineItems = ref([
            {
                itemDescription: "",
                quantity: "",
                amount: "",
            },
        ]);

        const formState = reactive({
            client_name: "",
            email: "",
            item_description: "",
            quantity: "",
            amount: "",
            total_amount: "",
            subtotal: "",
            vat_amount: "",
            vat: "",
            invoice_date: "",
            invoice_id: "",
            tax_date: "",
            payment_terms: "",
            due_date: "",
            client_pin_no: "",
            notes: "",
        });

        const fetchInvoiceDetails = async (invoiceId) => {
            try {
                const response = await DataService.get(
                    `/invoices/${invoiceId}`,
                );
                console.log("Details fetched of a invoice", response.data);
                const invoiceDetails = response.data.Invoice;

                console.log("Further details of invoice:", invoiceDetails);
                return invoiceDetails;
            } catch (error) {
                console.error("Error fetching invoice:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        const updateInvoiceDetails = async (invoiceId, updatedDetails) => {
            try {
                const response = await DataService.put(
                    `/invoices/${invoiceId}`,
                    updatedDetails,
                );
                console.log("Invoice updated successfully:", response.data);
            } catch (error) {
                console.error("Error updating invoice:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        onMounted(async () => {
            const invoiceDetails = await fetchInvoiceDetails(props.id);
            console.log("Invoice details:", invoiceDetails);

            // Populate lineItems with items data from invoiceDetails
            lineItems.value = invoiceDetails.items.map((item) => ({
                itemDescription: item.itemDescription,
                quantity: item.quantity,
                amount: item.amount,
            }));

            // Assign client details to formState
            formState.client_name = invoiceDetails.client.user.first_name;
            formState.email = invoiceDetails.client.user.email;
            formState.client_pin_no = invoiceDetails.client.company_pin;
            formState.invoice_id = invoiceDetails.id;
            formState.invoice_date = invoiceDetails.invoice_date;
            formState.due_date = invoiceDetails.due_date;
            formState.tax_date = invoiceDetails.tax_date;
            formState.payment_terms = invoiceDetails.payment_terms;
            formState.total_amount = invoiceDetails.total_amount;
            formState.vat_amount = invoiceDetails.vat_amount;
            formState.vat = invoiceDetails.vat;
            formState.subtotal = invoiceDetails.subtotal;

            formState.notes = invoiceDetails.notes;
        });

        const handleFinish = async () => {
            try {
                isLoading.value = true;

                await updateInvoiceDetails(props.id, formState);
                toast.success("Invoice updated successfully!");
                // router.push({
                //     path: `/app/drivers/edit/${props.id}`,
                //     query: { _r: Date.now() },
                // });

                console.log("Invoice updated successfully");
            } catch (error) {
                toast.error("Error updating Invoice");
                console.error("Error updating Invoice:", error);
            } finally {
                isLoading.value = false;
            }
        };

        const handleFinishFailed = (errors) => {
            console.log(errors);
        };

        const handleCancel = () => {
            router.push(`/app/invoice-sales-order`);
        };

        const updateSubtotalAndTotal = () => {
            console.log("Updating subtotal and total");
            // Calculate subtotal
            formState.subtotal = lineItems.value.reduce((total, item) => {
                return total + parseFloat(item.amount || 0);
            }, 0);

            // Calculate VAT if toggled
            formState.vat && (formState.vat_amount = formState.subtotal * 0.16);

            // Calculate total
            formState.total_amount =
                formState.subtotal + (formState.vat ? formState.vat_amount : 0);
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
            formState,
            handleFinish,
            handleFinishFailed,
            handleCancel,
            checked,
            lineItems,
            addLineItem,
            removeLastLineItem,
        };
    },
});

export default InvoiceView;
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

.borderless-input {
    border: none; /* Removes the border */
    outline: none; /* Removes the outline when focused */
    /* Add any additional styling as needed */
}

.input-data {
    width: 130px;
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
