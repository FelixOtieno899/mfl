<template>
    <sdCards>
        <template v-slot:title>
            <div class="setting-card-title">
                <sdHeading as="h4">Account's Info</sdHeading>
            </div>
        </template>
        <BasicFormWrapper v-if="isLoading">
            <a-space>
                <a-spin size="large" />
            </a-space>
        </BasicFormWrapper>

        <BasicFormWrapper v-else>
            <a-form
                :model="formState"
                @finish="handleFinish"
                :rules="rules"
                layout="vertical"
            >
                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-item label="Account Name" name="name">
                            <a-input
                                type="text"
                                v-model:value="formState.name"
                                readonly
                            />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-item label="Account Type" name="name">
                            <a-input
                                type="text"
                                v-model:value="formState.account_type"
                                readonly
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item label="Category" name="category">
                            <a-input
                                type="text"
                                v-model:value="formState.category"
                                readonly
                            />
                        </a-form-item>
                    </a-col>

                    <a-col :span="8">
                        <a-form-item label="Currency" name="currency">
                            <a-input
                                type="text"
                                v-model:value="formState.currency"
                                readonly
                            />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-item
                            label="Acquisition Date"
                            name="acquistion_date"
                        >
                            <a-input
                                type="text"
                                v-model:value="formState.acquisition_date"
                                readonly
                            />
                        </a-form-item>
                    </a-col>

                    <a-col :span="12">
                        <a-form-item
                            label="Purchase Price"
                            name="purchase_price"
                        >
                            <a-input
                                type="text"
                                v-model:value="formState.purchase_price"
                                readonly
                            />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-item label="Current Value" name="current_value">
                            <a-input
                                type="text"
                                v-model:value="formState.current_value"
                                readonly
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item
                            label="Depreciation Method"
                            name="depreciation_method"
                        >
                            <a-input
                                type="text"
                                v-model:value="formState.depreciation_method"
                                readonly
                            />
                        </a-form-item>
                    </a-col>

                    <a-col :span="8">
                        <a-form-item
                            label="Depreciation Rate"
                            name="depreciation_rate"
                        >
                            <a-input
                                type="text"
                                v-model:value="formState.depreciation_rate"
                                readonly
                            />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-item
                            label="Account Number"
                            name="account_number"
                        >
                            <a-input
                                type="text"
                                v-model:value="formState.account_number"
                                readonly
                            />
                        </a-form-item>
                    </a-col>

                    <a-col :span="8">
                        <a-form-item
                            label="Opening Balance"
                            name="opening_balance"
                        >
                            <a-input
                                type="text"
                                v-model:value="formState.opening_balance"
                                readonly
                            />
                        </a-form-item>
                    </a-col>

                    <a-col :span="8">
                        <a-form-item
                            label="Closing Balance"
                            name="closing_balance"
                        >
                            <a-input
                                type="text"
                                v-model:value="formState.closing_balance"
                                readonly
                            />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-item label="Tax Code" name="tax_code">
                            <a-input
                                type="text"
                                v-model:value="formState.tax_code"
                                readonly
                            />
                        </a-form-item>
                    </a-col>

                    <a-col :span="8">
                        <a-form-item label="Location" name="location">
                            <a-input
                                type="text"
                                v-model:value="formState.location"
                                readonly
                            />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-item label="Description" name="description">
                            <a-textarea
                                type="text"
                                v-model:value="formState.description"
                                readonly
                            />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row style="margin-top: 30px" :gutter="16">
                    <a-col :span="24">
                        <a-space align="end">
                            <a-button @click="handleCancel">Back</a-button>
                        </a-space>
                    </a-col>
                </a-row>
            </a-form>
        </BasicFormWrapper>
    </sdCards>
</template>

<script>
import { DataService } from "@/config/dataService/dataService";
import { BasicFormWrapper } from "../../../../styled";
import { defineComponent, reactive, onMounted } from "vue";
//import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const AccountView = defineComponent({
    name: "AccountView",
    components: { BasicFormWrapper },
    props: ["id"], // Accept the id prop

    setup(props) {
        const router = useRouter();
        // const toast = useToast();
        // const isLoading = ref(false);

        const formState = reactive({
            account_type: "",
            category: "",
            name: "",
            acquisition_date: "",
            purchase_price: "",
            current_value: "",
            depreciation_method: "",
            depreciation_rate: "",
            accumulated_depreciation: "",
            currency: "",
            account_number: "",
            opening_balance: "",
            closing_balance: "",
            tax_code: "",
            location: "",
            vendor: "",
            warranty_information: "",
            status: "",
            description: "",
            //vehicle_image: null,
        });

        const fetchAccountDetails = async (accountId) => {
            try {
                const response = await DataService.get(`/account/${accountId}`);
                console.log("Details fetched of account", response.data);
                const accountDetails = response.data.Account;
                return accountDetails;
            } catch (error) {
                console.error("Error fetching account details:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        onMounted(async () => {
            const accountDetails = await fetchAccountDetails(props.id);
            Object.assign(formState, accountDetails);

            formState.account_type = accountDetails.account_type.name;
        });

        const handleCancel = () => {
            router.push(`/app/accounts`);
        };

        return {
            formState,
            //handleFinish,
            // handleFinishFailed,
            handleCancel,
        };
    },
});

export default AccountView;
</script>
