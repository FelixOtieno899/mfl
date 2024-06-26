<template>
    <sdCards>
        <template v-slot:title>
            <div class="setting-card-title">
                <sdHeading as="h4">Client Destinations Info</sdHeading>
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
                        <a-form-Item label="Client">
                            <a-input
                                v-model:value="formState.first_name"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Contact Person">
                            <a-input
                                v-model:value="formState.contact_person"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>

                    <a-col :span="8">
                        <a-form-Item label="Contact Number">
                            <a-input
                                v-model:value="formState.contact_number"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                </a-row>

                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-Item label="Email">
                            <a-input
                                v-model:value="formState.contact_email"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>

                    <a-col :span="12">
                        <a-form-Item label="Destination Coordinates">
                            <a-input
                                v-model:value="
                                    formState.destination_coordinates
                                "
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                </a-row>

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
import { defineComponent, reactive, onMounted } from "vue";
// import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const ClientDestinationView = defineComponent({
    name: "ClientDestinationView",
    components: { BasicFormWrapper },
    props: ["id"], // Accept the id prop

    setup(props) {
        const router = useRouter();
        // const toast = useToast();
        // const isLoading = ref(false);

        const formState = reactive({
            first_name: "",
            contact_person: "",
            contact_number: "",
            contact_email: "",
            destination_coordinates: "",
        });

        const fetchClientDestinationDetails = async (clientDestinationId) => {
            try {
                const response = await DataService.get(
                    `/clients-destinations/${clientDestinationId}`,
                );
                console.log(
                    "Details fetched of a  client Destination",
                    response.data,
                );
                const clientDestinationDetails =
                    response.data.Client_destination;

                console.log(
                    "Further details of clients destination:",
                    clientDestinationDetails,
                );
                return clientDestinationDetails;
            } catch (error) {
                console.error("Error fetching client destiantion:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        onMounted(async () => {
            const clientDestinationDetails =
                await fetchClientDestinationDetails(props.id);
            console.log(
                "Client Destination details:",
                clientDestinationDetails,
            );

            // Assign client details to formState
            formState.first_name =
                clientDestinationDetails.client.user.first_name;
            formState.contact_person = clientDestinationDetails.contact_person;
            formState.contact_number = clientDestinationDetails.contact_number;
            formState.contact_email = clientDestinationDetails.contact_email;
            formState.destination_coordinates =
                clientDestinationDetails.destination_coordinates;
        });

        const handleFinishFailed = (errors) => {
            console.log(errors);
        };

        const handleCancel = () => {
            router.push(`/app/client-destinations`);
        };

        return {
            formState,
            // handleFinish,
            handleFinishFailed,
            handleCancel,
        };
    },
});

export default ClientDestinationView;
</script>
