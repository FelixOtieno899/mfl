<template>
    <Main>
        <div
            class="setting-card-title"
            style="margin-top: 20px; margin-left: 150px"
        >
            <sdHeading as="h4">Please confirm Trip's Information</sdHeading>
        </div>
        <WizardWrapper>
            <WizardFour>
                <Steps
                    isSwitch
                    isVertical
                    :current="0"
                    :status="status"
                    :steps="steps"
                    direction="vertical"
                    @onNext="next"
                    @onPrev="prev"
                    @onDone="done"
                    :isFinished="isFinished"
                >
                    <template #trip_details>
                        <BasicFormWrapper
                            v-if="tripDetails"
                            class="basic-form-inner"
                        >
                            <div class="ninjadash-form-checkout">
                                <a-row justify="center">
                                    <a-col :xs="24">
                                        <div
                                            class="payment-method-form profile-hints"
                                        >
                                            <sdHeading as="h4"
                                                >Trip Details</sdHeading
                                            >
                                            <p>
                                                Trip Name:
                                                <span>{{
                                                    tripDetails.name
                                                }}</span>
                                            </p>
                                            <p>
                                                Start Location:
                                                <span>{{
                                                    tripDetails.origin
                                                }}</span>
                                            </p>

                                            <p>
                                                Previous Litres:
                                                <span>{{
                                                    tripDetails.previous_litres
                                                }}</span>
                                            </p>

                                            <p>
                                                Trip Weight:
                                                <span>{{
                                                    tripDetails.trip_weight
                                                }}</span>
                                            </p>
                                        </div>
                                    </a-col>
                                </a-row>
                            </div>
                        </BasicFormWrapper>
                    </template>

                    <template #client_details>
                        <BasicFormWrapper
                            v-if="tripDetails"
                            class="basic-form-inner"
                        >
                            <div class="ninjadash-form-checkout">
                                <a-row justify="center">
                                    <a-col :xs="24">
                                        <div
                                            class="payment-method-form profile-hints"
                                        >
                                            <sdHeading as="h4"
                                                >Client Details</sdHeading
                                            >
                                            <p>
                                                Company Name:
                                                <span>{{
                                                    tripDetails
                                                        .fuel_dispensation_order
                                                        .fuel_purchase_order
                                                        .invoice.client
                                                        .company_name
                                                }}</span>
                                            </p>
                                            <p>
                                                Address:
                                                <span>{{
                                                    tripDetails
                                                        .fuel_dispensation_order
                                                        .fuel_purchase_order
                                                        .invoice.client.address
                                                }}</span>
                                            </p>
                                            <div
                                                v-for="(
                                                    destination, index
                                                ) in tripDetails
                                                    .fuel_dispensation_order
                                                    .fuel_purchase_order.invoice
                                                    .client.client_destinations"
                                                :key="index"
                                            >
                                                <p>
                                                    Contact Person:
                                                    <span>{{
                                                        destination.contact_person
                                                    }}</span>
                                                </p>
                                                <p>
                                                    Contact Number:
                                                    <span>{{
                                                        destination.contact_number
                                                    }}</span>
                                                </p>
                                                <p>
                                                    Email:
                                                    <span>{{
                                                        destination.contact_email
                                                    }}</span>
                                                </p>

                                                <p>
                                                    Destination Coordinates:
                                                    <span>{{
                                                        destination.destination_coordinates
                                                    }}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </a-col>
                                </a-row>
                            </div>
                        </BasicFormWrapper>
                    </template>

                    <template #fuel_dispensation_info>
                        <BasicFormWrapper
                            v-if="tripDetails"
                            class="basic-form-inner"
                        >
                            <div class="ninjadash-form-checkout">
                                <a-row justify="center">
                                    <a-col :xs="24">
                                        <div
                                            class="payment-method-form profile-hints"
                                        >
                                            <sdHeading as="h4"
                                                >Fuel Dispensation
                                                Information</sdHeading
                                            >
                                            <p>
                                                Fuel Type:
                                                <span>{{
                                                    tripDetails
                                                        .fuel_dispensation_order
                                                        .fuel_type
                                                }}</span>
                                            </p>
                                            <p>
                                                Quantity:
                                                <span
                                                    >{{
                                                        tripDetails
                                                            .fuel_dispensation_order
                                                            .quantity
                                                    }}
                                                    {{
                                                        tripDetails
                                                            .fuel_dispensation_order
                                                            .quantityabbreviationid
                                                            .name
                                                    }}</span
                                                >
                                            </p>
                                            <p>
                                                Dispense Date:
                                                <span>{{
                                                    tripDetails
                                                        .fuel_dispensation_order
                                                        .dispense_date
                                                }}</span>
                                            </p>
                                            <p>
                                                Dispense Location:
                                                <span>{{
                                                    tripDetails
                                                        .fuel_dispensation_order
                                                        .dispense_location
                                                }}</span>
                                            </p>
                                        </div>
                                    </a-col>
                                </a-row>
                            </div>
                        </BasicFormWrapper>
                    </template>

                    <template #delivery_details>
                        <BasicFormWrapper
                            v-if="tripDetails"
                            class="basic-form-inner"
                        >
                            <div class="ninjadash-form-checkout">
                                <a-row justify="center">
                                    <a-col :xs="24">
                                        <div
                                            class="payment-method-form profile-hints"
                                        >
                                            <sdHeading as="h4"
                                                >Delivery Details</sdHeading
                                            >
                                            <p>
                                                Delivery Date:
                                                <span>{{
                                                    tripDetails
                                                        .fuel_dispensation_order
                                                        .delivery_note
                                                        .delivery_date
                                                }}</span>
                                            </p>
                                            <ul>
                                                <li
                                                    v-for="(
                                                        item, index
                                                    ) in tripDetails
                                                        .fuel_dispensation_order
                                                        .delivery_note.items"
                                                    :key="index"
                                                >
                                                    {{ item.itemDescription }}
                                                </li>
                                            </ul>
                                        </div>
                                    </a-col>
                                </a-row>
                            </div>
                        </BasicFormWrapper>
                    </template>

                    <template #start>
                        <BasicFormWrapper
                            v-if="status !== 'finish'"
                            :style="{ width: '100%' }"
                        >
                            <a-form :model="formState" layout="vertical">
                                <a-row justify="center">
                                    <a-col :xs="24">
                                        <div
                                            class="ninjadash-finish-order"
                                            :style="{ width: '100%' }"
                                        >
                                            <sdHeading as="h4"
                                                >Ready to Start Trip?</sdHeading
                                            >
                                            <a-checkbox
                                                v-model:checked="checked"
                                                ><span class="checkbox-label"
                                                    >I Agree with the Terms and
                                                    Conditions.</span
                                                ></a-checkbox
                                            >
                                        </div>

                                        <a-form-Item label="Trip Status" hidden>
                                            <a-input
                                                hidden
                                                v-model:value="trip_status"
                                            />
                                        </a-form-Item>
                                    </a-col>
                                </a-row>
                            </a-form>
                        </BasicFormWrapper>

                        <a-row
                            v-else
                            justify="center"
                            :style="{ width: '100%' }"
                        >
                            <a-col :xs="24">
                                <div class="checkout-successful">
                                    <sdCards
                                        headless
                                        :bodyStyle="{
                                            borderRadius: '20px',
                                        }"
                                    >
                                        <sdCards headless>
                                            <span class="icon-success">
                                                <unicon name="check"></unicon>
                                            </span>
                                            <sdHeading as="h3"
                                                >Thank You</sdHeading
                                            >
                                            <p>
                                                Your trip has been started
                                                successfully
                                            </p>
                                        </sdCards>
                                    </sdCards>
                                </div>
                            </a-col>
                        </a-row>
                    </template>
                </Steps>
            </WizardFour>
        </WizardWrapper>
    </Main>
</template>
<script>
import { DataService } from "@/config/dataService/dataService";
import { WizardWrapper, WizardFour } from "../Style";
import { Main, BasicFormWrapper } from "../../../../styled";
import Steps from "@/components/steps/steps";
import { useStore } from "vuex";
import { computed, ref, defineComponent, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";

const TripView = defineComponent({
    name: "TripView",
    components: {
        Main,
        Steps,
        WizardWrapper,
        WizardFour,
        BasicFormWrapper,
    },
    props: ["id"],

    setup(props) {
        const { state } = useStore();
        const router = useRouter();
        const isLoading = computed(() => state.cart.loading);
        const rtl = computed(() => state.themeLayout.rtlData);
        const status = ref("process");
        const isFinished = ref(false);
        const isVertical = ref(true);
        const current = ref(1);

        const tripDetails = ref(null);

        const formState = reactive({
            trip_status: "ongoing",
        });

        const fetchTripDetails = async (tripId) => {
            try {
                const response = await DataService.get(`/trips/${tripId}`);
                console.log("Details fetched of a trip", response.data);
                const accountTripDetails =
                    response.data.Fuel_dispensation_order;
                return accountTripDetails;
            } catch (error) {
                console.error("Error fetching trip details:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        onMounted(async () => {
            const fetchedTripDetails = await fetchTripDetails(props.id);
            console.log("Trip details", fetchedTripDetails);
            tripDetails.value = fetchedTripDetails;
        });

        const next = () => {
            status.value = "process";
            current.value = current.value + 1;
        };

        const prev = () => {
            status.value = "process";
            current.value = current.value - 1;
        };

        const done = async () => {
            const confirm = window.confirm(
                "Are you sure you want to start the trip?",
            );
            if (confirm) {
                status.value = "finish";
                isFinished.value = true;
                current.value = 0;

                const tripId = tripDetails.value.id;
                try {
                    await DataService.put(`/trips/${tripId}`, formState);
                    console.log("Trip status updated successfully");
                    router.push("/app/trips"); // Navigate to the desired location after successful update
                } catch (error) {
                    console.error("Error updating trip status:", error);
                }
            }
        };

      
        return {
            done,
            prev,
            next,
            isLoading,
            rtl,
            status,
            isFinished,
            isVertical,
            current,
            tripDetails,
            checked: ref(false),
            steps: [
                {
                    title: "Trip Details",
                    content: "trip_details",
                },

                {
                    title: "Client details",
                    content: "client_details",
                },
                {
                    title: "Fuel Dispensation Info",
                    content: "fuel_dispensation_info",
                },
                {
                    title: "Delivery details",
                    content: "delivery_details",
                },
                {
                    title: "Start",
                    content: "start",
                },
            ],

            formState,
        };
    },
});

export default TripView;
</script>
