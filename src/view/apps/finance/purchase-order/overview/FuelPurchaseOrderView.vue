<template>
    <sdCards>
        <template v-slot:title>
            <div class="setting-card-title">
                <sdHeading as="h4">Fuel Purchase Order info</sdHeading>
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
                @finishFailed="handleFinishFailed"
                layout="vertical"
            >
                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-Item label="Fuel Type">
                            <a-input
                                v-model:value="formState.fuel_type"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Quantity">
                            <a-input
                                v-model:value="formState.quantity"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Quantity Measurement">
                            <select
                                v-model="formState.quantity_abbreviation_id"
                                class="custom-select"
                                disabled
                            >
                                <option disabled value="">
                                    Select unit of measurement
                                </option>
                                <option
                                    v-for="unit in unitsOfMeasures"
                                    :key="unit.id"
                                    :value="unit.id"
                                >
                                    {{ unit.name }}
                                </option>
                            </select>
                        </a-form-Item>
                    </a-col>
                </a-row>

                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-Item label="Unit Price">
                            <a-input
                                v-model:value="formState.unit_price"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Unit Price Measurement">
                            <select
                                v-model="formState.unit_price_abbreviation_id"
                                class="custom-select"
                                disabled
                            >
                                <option disabled value="">
                                    Select unit of measurement
                                </option>
                                <option
                                    v-for="unit in unitsOfMeasures"
                                    :key="unit.id"
                                    :value="unit.id"
                                >
                                    {{ unit.name }}
                                </option>
                            </select>
                        </a-form-Item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-Item label="Purchase Date">
                            <a-input
                                v-model:value="formState.purchase_date"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Supplier">
                            <a-input
                                v-model:value="formState.supplier_name"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Invoice Ref No">
                            <a-input
                                v-model:value="formState.invoice_no"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                </a-row>

                <!-- <a-col :span="8">
                    <a-form-item label="Country" name="country_id">
                        <a-select
                            v-model:value="form.country_id"
                            placeholder="Select country"
                        >
                            <a-select-option
                                value="country_id"
                                >{{
                            }}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="State" name="state_id">
                        <a-select
                            v-model:value="form.state_id"
                            placeholder="Select State"
                        >
                            <a-select-option
                                value="state_id"
                                >{{
                            }}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>

                <a-col :span="8">
                    <a-form-item label="City" name="city_id">
                        <a-select
                            v-model:value="form.city_id"
                            placeholder="Select City"
                        >
                            <a-select-option value="city_id"></a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col> -->

                <div class="setting-form-actions">
                    <sdButton size="default" @click="handleCancel" type="light">
                        Back
                    </sdButton>
                </div>
            </a-form>
        </BasicFormWrapper>
    </sdCards>
</template>

<script>
import { DataService } from "@/config/dataService/dataService";
import { BasicFormWrapper } from "../../../../styled";
import { defineComponent, ref, reactive, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const FuelPurchaseOrderView = defineComponent({
    name: "FuelPurchaseOrderView",
    components: { BasicFormWrapper },
    props: ["id"], // Accept the id prop

    setup(props) {
        const router = useRouter();
        const toast = useToast();
        const isLoading = ref(false);

        const unitsOfMeasures = ref([]);

        const formState = reactive({
            fuel_type: "",
            quantity: "",
            supplier_name: "",
            quantity_measurement: "",
            quantity_abbreviation_id: "",
            unit_price_abbreviation_id: "",
            purchase_date: "",
            unit_price_measurement: "",
            invoice_no: "",
        });

        const fetchFuelPurchaseOrderDetails = async (fuelPurchaseOrderId) => {
            try {
                const response = await DataService.get(
                    `/fuel_purchase_order/${fuelPurchaseOrderId}`,
                );
                console.log(
                    "Details fetched of fuel purchase order",
                    response.data,
                );
                const fuelPurchaseOrderDetails =
                    response.data.Fuel_purchase_order;
                return fuelPurchaseOrderDetails;
            } catch (error) {
                console.error("Error fetching fuel purchase order :", error);
                if (error.response) {
                    console.error("Error response:", error.response);
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

        const updateFuelPurchaseOrderDetails = async (
            fuelPurchaseOrderId,
            updatedDetails,
        ) => {
            try {
                const response = await DataService.put(
                    `/fuel_purchase_order/${fuelPurchaseOrderId}`,
                    updatedDetails,
                );
                console.log(
                    "Fuel Purchase Order   updated successfully:",
                    response.data,
                );
            } catch (error) {
                console.error("Error updating Fuel Purchase Order:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        onMounted(async () => {
            await fetchUnitsOfMeasures();
            const fuelPurchaseOrderDetails =
                await fetchFuelPurchaseOrderDetails(props.id);
            Object.assign(formState, fuelPurchaseOrderDetails);

            console.log(
                "Details of fuel purchase order to be update",
                fuelPurchaseOrderDetails,
            );
            console.log(
                "Fetched fuel type:",
                fuelPurchaseOrderDetails.fuel_type,
            );
            console.log("Assigned form state fuel type:", formState.fuel_type);

            formState.fuel_type = fuelPurchaseOrderDetails.fuel_type;
            formState.supplier_name = fuelPurchaseOrderDetails.supplier.name;
            formState.quantity_abbreviation_id =
                fuelPurchaseOrderDetails.quantityabbreviationid.id;
            formState.unit_price_abbreviation_id =
                fuelPurchaseOrderDetails.unitpriceabbreviationid.id;

            formState.invoice_no = fuelPurchaseOrderDetails.invoice.id;
        });

        const handleFinish = async () => {
            try {
                isLoading.value = true;

                await updateFuelPurchaseOrderDetails(props.id, formState);
                toast.success("Fuel Purchase  order  updated successfully!");
                // router.push({
                //     path: `/app/drivers/edit/${props.id}`,
                //     query: { _r: Date.now() },
                // });

                console.log("Fuel Purchase  order updated successfully");
            } catch (error) {
                toast.error("Error updating Fuel Purchase  order");
                console.error("Error updating Fuel Purchase  order:", error);
            } finally {
                isLoading.value = false;
            }
        };

        const handleFinishFailed = (errors) => {
            console.log(errors);
        };

        const handleCancel = () => {
            router.push(`/app/fuel-purchase-order`);
        };

        return {
            formState,
            handleFinish,
            handleFinishFailed,
            handleCancel,
            unitsOfMeasures,
        };
    },
});

export default FuelPurchaseOrderView;
</script>

<style scoped>
.custom-select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f8f8f8;
    font-size: 12px;
    width: 180px;
    max-width: 300px; /* Adjust the width as needed */
}
</style>
