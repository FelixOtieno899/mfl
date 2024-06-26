<template>
    <sdCards>
        <template v-slot:title>
            <div style="margin-left: 168px" class="setting-card-title">
                <sdHeading as="h4">Credit Note Info</sdHeading>
            </div>

            <form :model="form" layout="vertical">
                <section class="wrapper-invoice">
                    <!-- switch mode rtl by adding class rtl on invoice class -->
                    <div class="invoice">
                        <div class="invoice-information">
                            <p>
                                <b>Date Issued</b>:
                                <input
                                    style="border: none; outline: none"
                                    class="input-data"
                                    type="text"
                                    v-model="formState.issue_date"
                                />
                            </p>
                            <p>
                                <b>Credit Amount:</b>
                                <input
                                    style="border: none; outline: none"
                                    class="input-data"
                                    type="text"
                                    v-model="formState.credit_amount"
                                />
                            </p>
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

                        <div class="invoice-logo-brand">
                            <p>
                                Invoice No:
                                <input
                                    style="
                                        font-size: 12px;
                                        border: none;
                                        outline: none;
                                    "
                                    class="input-data"
                                    type="text"
                                    v-model="formState.invoice_reference_number"
                                    read
                                />
                            </p>
                        </div>

                        <div class="invoice-footer">
                            <p>Description:</p>
                            <p>
                                <textarea
                                    style="
                                        width: 250px;
                                        border-radius: 5px;
                                        height: 80px;
                                    "
                                    class=""
                                    type="text"
                                    v-model="formState.reason"
                                />
                            </p>
                        </div>
                    </div>
                </section>

                <div
                    style="margin-left: 190px; margin-top: 40px"
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
import { defineComponent, ref, reactive, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const CreditNoteView = defineComponent({
    name: "CreditNoteView",
    //components: { BasicFormWrapper },
    props: ["id"], // Accept the id prop

    setup(props) {
        const router = useRouter();
        const toast = useToast();
        const isLoading = ref(false);
        const checked = ref(true);

        const formState = reactive({
            issue_date: "",
            credit_amount: "",
            invoice_reference_number: "",
            reason: "",
        });

        const fetchCreditNoteDetails = async (creditNoteId) => {
            try {
                const response = await DataService.get(
                    `/credit_note/${creditNoteId}`,
                );
                console.log("Details fetched of a  credit note", response);
                const creditNoteDetails = response.data.Credit_note;

                console.log(
                    "Further details of credit note:",
                    creditNoteDetails,
                );
                return creditNoteDetails;
            } catch (error) {
                console.error("Error fetching credit note:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        const updateCreditNoteDetails = async (
            creditNoteId,
            updatedDetails,
        ) => {
            try {
                const response = await DataService.put(
                    `/credit_note/${creditNoteId}`,
                    updatedDetails,
                );
                console.log("Credit Note updated successfully:", response.data);
            } catch (error) {
                console.error("Error updating credit note:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        onMounted(async () => {
            console.log("Id is ", props.id);
            const creditNoteDetails = await fetchCreditNoteDetails(props.id);
            console.log("Credit note details:", creditNoteDetails);

            // Assign delivery note details to formState
            formState.issue_date = creditNoteDetails.issue_date;
            formState.credit_amount = creditNoteDetails.credit_amount;
            formState.invoice_reference_number = creditNoteDetails.invoice.id;
            formState.reason = creditNoteDetails.reason;
        });

        const handleFinish = async () => {
            try {
                isLoading.value = true;

                await updateCreditNoteDetails(props.id, formState);
                toast.success("credit note updated successfully!");
                // router.push({
                //     path: `/app/drivers/edit/${props.id}`,
                //     query: { _r: Date.now() },
                // });

                console.log("Credit note updated successfully");
            } catch (error) {
                toast.error("Error updating Credit Note");
                console.error("Error updating Credit Note:", error);
            } finally {
                isLoading.value = false;
            }
        };

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

        const handleFinishFailed = (errors) => {
            console.log(errors);
        };

        const handleCancel = () => {
            router.push(`/app/credit-note`);
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

export default CreditNoteView;
</script>

<style scoped>
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
    text-transform: sentencecase;
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
    font-weight: bold;
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

.wrapper-invoice .invoice .invoice-logo-brand p {
    font-size: 2vh;
    color: gray;
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
    font-size: 2vh;
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
