<template>
    <div class="flex gap-4">
        <!-- Avatar -->
        <div class="w-10 h-10 rounded-full overflow-hidden mt-2">
            <img :src="src" class="w-full h-full object-cover"/>
        </div>

        <!-- Mensagem -->
        <div class="w-full">
            <h4 class="font-bold text-xl"> {{ name }} </h4>
            <h5 class="text-gray text-sm font-bold -mt-1"> {{ formattedDate }}, {{ formattedHour }} </h5>

            <div>
                <p> {{ message }} </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "MessageChat",
    props: {
        name: {
            type: String,
            required: true
        },
        src: {
            type: String,
            required: true
        },
        msgTimestamp: {
            type: [String, Number], // Aceita String ou Número
            required: true
        },
        message: {
            type: String,
            required: true
        }
    },
    computed: {
        formattedDate() {
            if (!this.msgTimestamp) return "";
            
            const date = new Date(this.msgTimestamp);
            const today = new Date();

            
            const isToday = 
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear();

            return isToday ? "Today" : date.toLocaleDateString(undefined, {
                year: "numeric",
                month: "numeric",
                day: "numeric"
            });
        },
        formattedHour() {
            if (!this.msgTimestamp) return "";
            
            const date = new Date(this.msgTimestamp);
            return date.toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            });
        }
    }
};
</script>
