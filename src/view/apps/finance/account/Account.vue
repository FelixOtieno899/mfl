<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title="Manage Accounts">
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
                                    title="Create New Account"
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
                                        <a-form
                                            :model="form"
                                            @finish="handleSubmit"
                                            :rules="rules"
                                            layout="vertical"
                                        >
                                            <a-row :gutter="16">
                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Account Name"
                                                        name="name"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.name
                                                            "
                                                            placeholder="Please enter name"
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Account Type"
                                                        name="account_type_id"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                            },
                                                        ]"
                                                    >
                                                        <select
                                                            v-model="
                                                                form.account_type_id
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option value="">
                                                                Select Account
                                                                Type
                                                            </option>
                                                            <option
                                                                v-for="accountType in accountTypes"
                                                                :key="
                                                                    accountType.id
                                                                "
                                                                :value="
                                                                    accountType.id
                                                                "
                                                            >
                                                                {{
                                                                    accountType.name
                                                                }}
                                                            </option>
                                                        </select>
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>
                                            <a-row :gutter="16">
                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Category"
                                                        name="category"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                            },
                                                        ]"
                                                    >
                                                        <select
                                                            v-model="
                                                                form.category
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option value="">
                                                                Select Category
                                                            </option>
                                                            <option
                                                                value="Current Asset"
                                                            >
                                                                Current Asset
                                                            </option>

                                                            <option
                                                                value="Fixed Asset"
                                                            >
                                                                Fixed Asset
                                                            </option>
                                                            <option
                                                                value="Current Liability"
                                                            >
                                                                Current
                                                                Liability
                                                            </option>
                                                            <option
                                                                value="Long-term Liability"
                                                            >
                                                                Long-term
                                                                Liability
                                                            </option>
                                                            <option
                                                                value="Equity"
                                                            >
                                                                Equity
                                                            </option>
                                                            <option
                                                                value="Income"
                                                            >
                                                                Income
                                                            </option>
                                                            <option
                                                                value="Cost Of Sale"
                                                            >
                                                                Cost Of Sale
                                                            </option>
                                                            <option
                                                                value="Expense"
                                                            >
                                                                Expense
                                                            </option>
                                                        </select>
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Currency"
                                                        name="currency_abbreviation_id"
                                                        :rules="[
                                                            {
                                                                required: false,
                                                            },
                                                        ]"
                                                    >
                                                        <select
                                                            v-model="
                                                                form.currency_abbreviation_id
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option value="">
                                                                Select Currency
                                                            </option>
                                                            <option
                                                                v-for="unit in measurements"
                                                                :key="unit.id"
                                                                :value="unit.id"
                                                            >
                                                                {{ unit.name }}
                                                            </option>
                                                        </select>
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Unit of Measure"
                                                        name="quantity_abbreviation_id"
                                                        :rules="[
                                                            {
                                                                required: false,
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
                                                                Quanity
                                                                measurement
                                                            </option>
                                                            <option
                                                                v-for="unit in measurements"
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
                                                        label="Acquisition Date"
                                                        name="acquisition_date"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                            },
                                                        ]"
                                                    >
                                                        <a-date-picker
                                                            v-model:value="
                                                                form.acquisition_date
                                                            "
                                                            style="width: 100%"
                                                            :get-popup-container="
                                                                (trigger) =>
                                                                    trigger.parentElement
                                                            "
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Purchase Price"
                                                        name="purchase_price"
                                                        :rules="[
                                                            {
                                                                required: false,
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.purchase_price
                                                            "
                                                            placeholder="Enter purchase price"
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>

                                            <a-row :gutter="16">
                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Current Value"
                                                        name="current_value"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.current_value
                                                            "
                                                            placeholder="Please enter current value"
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Depreciation Method"
                                                        name="depreciation_method"
                                                        :rules="[
                                                            {
                                                                required: false,
                                                            },
                                                        ]"
                                                    >
                                                        <select
                                                            v-model="
                                                                form.depreciation_method
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option value="">
                                                                Select
                                                                Depreciation
                                                                Method
                                                            </option>
                                                            <option
                                                                value="straight_line"
                                                            >
                                                                Straight-line
                                                            </option>
                                                            <option
                                                                value="declining_balance"
                                                            >
                                                                Declining
                                                                Balance
                                                            </option>
                                                            <option
                                                                value="unit_of_production"
                                                            >
                                                                Units of
                                                                Production
                                                            </option>
                                                            <option value="syd">
                                                                Sum of Year
                                                                Digits
                                                            </option>
                                                        </select>
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Depreciation Rate"
                                                        name="depreciation_rate"
                                                        :rules="[
                                                            {
                                                                required: false,
                                                            },
                                                        ]"
                                                    >
                                                        <select
                                                            v-model="
                                                                form.depreciation_rate
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option value="">
                                                                Select
                                                                Depreciation
                                                                Rate
                                                            </option>
                                                            <option
                                                                value="0.05"
                                                            >
                                                                5%
                                                            </option>
                                                            <option value="0.1">
                                                                10%
                                                            </option>
                                                            <option
                                                                value="0.15"
                                                            >
                                                                15%
                                                            </option>
                                                            <option value="0.2">
                                                                20%
                                                            </option>
                                                        </select>
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>

                                            <a-row :gutter="16">
                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Account Number"
                                                        name="account_number"
                                                        :rules="[
                                                            {
                                                                required: false,
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.account_number
                                                            "
                                                            placeholder="Enter Account Number"
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Opening Balance"
                                                        name="opening_balance"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.opening_balance
                                                            "
                                                            placeholder="Please enter opening balance"
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Closing Balance"
                                                        name="closing_balance"
                                                        :rules="[
                                                            {
                                                                required: false,
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.closing_balance
                                                            "
                                                            placeholder="Please enter closing balance"
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>

                                            <a-row :gutter="16">
                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Tax Code"
                                                        name="tax_code"
                                                        :rules="[
                                                            {
                                                                required: false,
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.tax_code
                                                            "
                                                            placeholder="Enter Tax code"
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Location"
                                                        name="location"
                                                        :rules="[
                                                            {
                                                                required: false,
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.location
                                                            "
                                                            placeholder="Please enter opening balance"
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>

                                            <a-row :gutter="16">
                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Description"
                                                        name="description"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                            },
                                                        ]"
                                                    >
                                                        <a-textarea
                                                            type="text"
                                                            v-model:value="
                                                                form.description
                                                            "
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>

                                            <a-row
                                                style="margin-top: 30px"
                                                :gutter="16"
                                            >
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
                            @search="fetchAccounts"
                        />
                    </sdCards>
                </BorderLessHeading>
            </a-col>
        </a-row>
    </Main>
</template>

<script>
import { DataService } from "@/config/dataService/dataService";
import { defineComponent, onMounted } from "vue";
import { Main } from "../../../styled";
import DataTables from "@/components/table/DataTable.vue";
import { BorderLessHeading } from "../../../styled";
import { reactive, ref } from "vue";
//import { useStore } from "vuex";

import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export default defineComponent({
    name: "Account",
    components: {
        Main,
        DataTables,
        BorderLessHeading,
    },
    setup() {
        const router = useRouter();
        const toast = useToast();

        const isLoading = ref(false);
        // const { state, dispatch } = useStore();

        const tableDataScource = ref([]);

        const accountTypes = ref([]);
        const measurements = ref([]);

        const fetchAllData = async () => {
            await Promise.all([
                fetchAccounts(),
                fetchAccountTypes(),
                fetchUnitsOfMeasurements(),
            ]);
        };

        const fetchAccounts = async (name = null) => {
            try {
                let response;
                if (name) {
                    // Call the searchCreditNote method if  IssueDate is provided
                    response = await searchAccounts(name);
                } else {
                    // Existing logic to fetch all accounts
                    response = await DataService.get("/account");
                    console.log("Accounts fetched", response.data);
                    if (response.status === 200) {
                        if (Array.isArray(response.data.Accounts)) {
                            // Format the data to match the structure expected by DataTables
                            tableDataScource.value = response.data.Accounts.map(
                                (account) => ({
                                    // id: `#${vehicle.id}`,
                                    key: account.id,
                                    name: (
                                        <span class="ninjadash-username">
                                            {account.name}
                                        </span>
                                    ),
                                    account_type: (
                                        <span>{account.account_type.name}</span>
                                    ),

                                    category: <span>{account.category}</span>,

                                    // status: (
                                    //     <span
                                    //         class={`ninjadash-status ninjadash-status-${vehicle.status}`}
                                    //     >
                                    //         {vehicle.status}
                                    //     </span>
                                    // ),
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
                console.error("Error fetching accounts:", error);
                toast.error("An error occurred. Please try again.");
            }
        };

        const searchAccounts = async (name) => {
            try {
                const response = await DataService.get(
                    `/account/search/${name}`,
                );

                console.log("Searched acount", response.data);
                if (
                    response.status === 200 &&
                    Array.isArray(response.data.Accounts)
                ) {
                    tableDataScource.value = response.data.Accounts.map(
                        (account) => ({
                            // id: `#${vehicle.id}`,
                            key: account.id,
                            name: (
                                <span class="ninjadash-username">
                                    {account.name}
                                </span>
                            ),
                            account_type: (
                                <span>{account.account_type.name}</span>
                            ),

                            category: <span>{account.category}</span>,

                            // status: (
                            //     <span
                            //         class={`ninjadash-status ninjadash-status-${vehicle.status}`}
                            //     >
                            //         {vehicle.status}
                            //     </span>
                            // ),
                        }),
                    );
                } else {
                    tableDataScource.value = [];
                }
            } catch (error) {
                console.error("Error searching account:", error);
                toast.error("An error occurred. Please try again.");
            }
        };

        const viewAccount = (accountId) => {
            router.push(`/app/accounts/${accountId}`);
        };

        const editAccount = (accountId) => {
            router.push(`/app/accounts/edit/${accountId}`);
        };
        const deleteAccount = async (accountId) => {
            if (
                window.confirm(
                    "Are you sure you want to delete this account? This action cannot be undone.",
                )
            ) {
                try {
                    await DataService.delete(`/accounts/${accountId}`);
                    toast.success("Account deleted successfully.");
                    await fetchAccounts(); // Refresh the list
                } catch (error) {
                    toast.error("Failed to delete account. Please try again.");
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
                title: "Name",
                dataIndex: "name",
                key: "user",
            },
            {
                title: "Account Type",
                dataIndex: "account_type",
                key: "coutry",
            },

            {
                title: "Category",
                dataIndex: "category",
                key: "position",
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
                                onClick={() => viewAccount(record.key)}
                            >
                                <unicon name="eye"></unicon>
                            </button>
                            <button
                                class="edit"
                                onClick={() => editAccount(record.key)}
                            >
                                <unicon name="edit"></unicon>
                            </button>
                            <button
                                class="delete"
                                onClick={() => deleteAccount(record.key)}
                            >
                                <unicon name="trash"></unicon>
                            </button>
                        </div>
                    );
                },
            },
        ];

        const form = reactive({
            account_type_id: "",
            category: "",
            name: "",
            description: "",
            currency_abbreviation_id: "",
            acquisition_date: "",
            purchase_price: "",
            current_value: "",
            depreciation_method: "",
            depreciation_rate: "",
            accumulated_depreciation: "",
            quantity_abbreviation_id: "",
            currency: "",
            account_number: "",
            opening_balance: "",
            closing_balance: "",
            tax_code: "",
            location: "",
            vendor: "",
            warranty_information: "",
            status: "",
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
            if (
                !form.account_type_id ||
                !form.category ||
                !form.name ||
                !form.description ||
                !form.acquisition_date ||
                !form.current_value ||
                !form.opening_balance
            ) {
                toast.error("Please fill in all required fields.");
                return; // Prevent form submission
            }

            // Check if the selected account  type is valid
            const selectedAccountType = accountTypes.value.find(
                (accountType) => accountType.id === form.account_type_id,
            );
            if (!selectedAccountType) {
                toast.error("Please select a valid account type.");
                return; // Prevent form submission
            }

            // Check if the selected currency is valid
            const selectedCurrency = measurements.value.find(
                (currency) => currency.id === form.currency_abbreviation_id,
            );
            if (!selectedCurrency) {
                toast.error("Please select a valid currency.");
                return; // Prevent form submission
            }

            // // Check if the selected quantity measurementis valid
            // const selectedCQuantity = measurements.value.find(
            //     (quantity) => quantity.id === form.quantity_abbreviation_id,
            // );
            // if (!selectedCQuantity) {
            //     toast.error("Please select a valid quantity unit of measure.");
            //     return; // Prevent form submission
            // }

            const formattedAcquisitionDate = new Date(form.acquisition_date)
                .toISOString()
                .split("T")[0];

            const formData = new FormData();

            // Append existing form fields
            formData.append("name", form.name);
            formData.append("account_type_id", form.account_type_id);
            formData.append("category", form.category);
            formData.append("description", form.description);

            if (form.acquisition_date) {
                formData.append("acquisition_date", formattedAcquisitionDate);
            }

            formData.append("purchase_price", form.purchase_price);
            formData.append("current_value", form.current_value);
            formData.append("depreciation_method", form.depreciation_method); // Corrected typo in field name
            formData.append("depreciation_rate", form.depreciation_rate);
            formData.append(
                "quantity_abbreviation_id",
                form.quantity_abbreviation_id,
            );
            formData.append(
                "accumulated_depreciation",
                form.accumulated_depreciation,
            );

            formData.append(
                "currency_abbreviation_id",
                form.currency_abbreviation_id,
            );
            formData.append("currency", form.currency);
            formData.append("account_number", form.account_number);
            formData.append("opening_balance", form.opening_balance);
            formData.append("closing_balance", form.closing_balance);
            formData.append("tax_code", form.tax_code);
            formData.append("location", form.location);
            formData.append("vendor", form.vendor);
            formData.append("warranty_information", form.warranty_information);
            formData.append("status", form.status);
            formData.append("created_by", form.created_by);

            try {
                isLoading.value = true;
                const response = await DataService.post("/account", formData);

                if (response.status === 201) {
                    toast.success("Record Added Successfully");

                    form.account_type_id = "";
                    form.category = "";
                    form.name = "";
                    form.description = "";
                    form.acquisition_date = "";
                    form.purchase_price = "";
                    form.current_value = "";
                    form.depreciation_method = "";
                    form.currency_abbreviation_id = "";
                    form.depreciation_rate = "";
                    form.accumulated_depreciation = "";
                    form.quantity_abbreviation_id = "";
                    form.currency = "";
                    form.account_number = "";
                    form.opening_balance = "";
                    form.closing_balance = "";
                    form.tax_code = "";
                    form.location = "";
                    form.vendor = "";
                    form.warranty_information = "";
                    form.status = "";
                    form.created_by = "";

                    // Close the drawer
                    open.value = false;

                    await fetchAccounts();

                    router.push({
                        path: "/app/accounts",
                    });
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

        const open = ref(false);
        const showDrawer = () => {
            open.value = true;
        };
        const onClose = () => {
            open.value = false;
        };

        const fetchAccountTypes = async () => {
            try {
                const response = await DataService.get(`/account_type`);
                console.log("Account types  fetched", response.data);
                accountTypes.value = response.data.Account_types;
            } catch (error) {
                console.error("Error fetching account types:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        const fetchUnitsOfMeasurements = async () => {
            try {
                const response = await DataService.get(`/units_of_measure`);
                console.log(
                    "Units of Measurements fetched fetched",
                    response.data.Units,
                );
                measurements.value = response.data.Units;
            } catch (error) {
                console.error("Error fetching units of measurements:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        onMounted(async () => {
            await fetchAllData();
        });

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
            accountTypes,
            fetchAccounts,
            measurements,
            // vehicleBrands,
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
