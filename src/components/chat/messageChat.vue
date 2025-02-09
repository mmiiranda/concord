<template>
    <div class="flex flex-col">
        <!-- Só exibe avatar se showHeader === true -->
        <div class="flex gap-4 ">
            <div v-if="showHeader" class="w-10 h-10 rounded-full overflow-hidden mt-2">
                <img :src="src" class="w-full h-full object-cover"/>
            </div>
            <div>
                <div>
                    <h4 v-if="showHeader" class="font-bold text-xl">{{ name }}</h4>
                    <h5 v-if="showHeader" class="text-white/60 text-sm font-bold -mt-1">
                        {{ formattedDate }}, {{ formattedHour }}
                    </h5>
                </div>
            </div>
        </div>

        <div>
          <!-- Só exibe nome + data/hora se showHeader === true -->
          
    
          <div>
            <p>{{ message }}</p>
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
            type: [String, Number], 
            required: true
        },
        message: {
            type: String,
            required: true
        },
        showHeader: {
            type: Boolean,
            default: true,
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


            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1); 

            const isYesterday =
                date.getDate() === yesterday.getDate() &&
                date.getMonth() === yesterday.getMonth() &&
                date.getFullYear() === yesterday.getFullYear();

            if (isYesterday) return "Yesterday";
            if (isToday) return "Today";

            return date.toLocaleDateString(undefined, {
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
                hour12: true
            });
        }
    }
};
</script>
