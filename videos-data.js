/**
 * ====================================================================
 * 🎬 ملف بيانات الفيديوهات الحقيقية - كورس الذكاء الاصطناعي (تقديم: Sheren)
 * ====================================================================
 */

const COURSE_DATA = {
    courseTitle: "كورس صناعة وتعديل الفيديوهات بالذكاء الاصطناعي",
    instructor: "Sheren",
    subtitle: "احترف إنشاء الفيديوهات السينمائية والمونتاج الذكي من الألف إلى الياء",
    modules: [
        {
            id: "module-1",
            title: "الوحدة الأولى: أسس البداية والسكربت والهوية البصرية",
            description: "تأسيس المشروع، كتابة الأوامر والسكربت وتصميم الشخصيات بالـ AI",
            lessons: [
                {
                    id: "lesson-1",
                    title: "1. المقدمة والترحيب بك في الكورس",
                    duration: "فيديو 1",
                    videoUrl: "https://drive.google.com/uc?export=download&id=14PsMIDCsy0kklF4uDhfgA7__WovlCqNO",
                    description: "نظرة عامة على محتوى الكورس والأهداف الرئيسية وخارطة الطريق لتحويل أفكارك إلى فيديوهات سينمائية بالذكاء الاصطناعي مع شيرين.",
                    resources: [
                        { name: "📄 ملخص خطة العمل في الكورس (PDF)", url: "#" }
                    ]
                },
                {
                    id: "lesson-2",
                    title: "2. كتابة السكربت الإعلاني بالذكاء الاصطناعي",
                    duration: "فيديو 2",
                    videoUrl: "https://drive.google.com/uc?export=download&id=1752d9u5QREdqsiwrI4k3GLBAbt0BBnEP",
                    description: "شرح كيفية استغلال نماذج الذكاء الاصطناعي لكتابة سكربت إعلاني جذاب واحترافي مقسم على مشاهد منسقة.",
                    resources: [
                        { name: "📝 نماذج سكربتات جاهزة للإعلانات", url: "#" }
                    ]
                },
                {
                    id: "lesson-3",
                    title: "3. تصميم شخصية وبيئة الإعلان بالـ AI",
                    duration: "فيديو 3",
                    videoUrl: "https://drive.google.com/uc?export=download&id=1H-i4vpdxZSMb-LTYFZ9ObnNppnmVn9G-",
                    description: "طريقة توليد شخصية متناسقة وبيئات إعلانية بدقة عالية تتماشى مع فكرة السكربت والهوية البصرية.",
                    resources: []
                }
            ]
        },
        {
            id: "module-2",
            title: "الوحدة الثانية: التوليد والتحريك بـ Flow وإنتاج المشاهد",
            description: "التحكم في واجهة Flow وتحريك المشاهد باحترافية عالية",
            lessons: [
                {
                    id: "lesson-4",
                    title: "4. شرح واجهة وأدوات موقع Flow",
                    duration: "فيديو 4",
                    videoUrl: "https://drive.google.com/uc?export=download&id=1Gup9NvoC_RQj0rf0AUOHkYnelcxmkJ7W",
                    description: "جولة تفصيلية داخل موقع Flow للتعرف على الأدوات، الإعدادات، وأفضل الخيارات للتوليد السينمائي.",
                    resources: [
                        { name: "🔗 رابط موقع Flow الرئيسي", url: "https://flow.com" }
                    ]
                },
                {
                    id: "lesson-5",
                    title: "5. عمل صورة أول المشاهد وتحريكها",
                    duration: "فيديو 5",
                    videoUrl: "https://drive.google.com/uc?export=download&id=1FIoL8uWZ16s7k_1yc34KoABx3fwNaaXU",
                    description: "التطبيق العملي لبناء أول مشهد وتحديد اتجاه حركة الكاميرا والإضاءة لإخراج فيديو ناعم وسلس.",
                    resources: []
                },
                {
                    id: "lesson-6",
                    title: "6. تكملة وتوليد باقي مشاهد الفيديو",
                    duration: "فيديو 6",
                    videoUrl: "https://drive.google.com/uc?export=download&id=1PgY4BQdGHqAWvI-hfSoVUfPHOUoyCsTa",
                    description: "استكمال توليد السلسلة الكاملة للمشاهد المتبقية للفيلم/الإعلان مع الحفاظ على تناسق الألوان والشخصية.",
                    resources: []
                }
            ]
        },
        {
            id: "module-3",
            title: "الوحدة الثالثة: الصوتيات، المونتاج بالـ AI والهندسة الصوتية",
            description: "صناعة التعليق الصوتي والمونتاج الذكي وإضافة الموسيقى",
            lessons: [
                {
                    id: "lesson-7",
                    title: "7. إنشاء عمل التعليق الصوتي (Voiceover)",
                    duration: "فيديو 7",
                    videoUrl: "https://drive.google.com/uc?export=download&id=1Na5DEwkwLGc20yF_wyOfAG0z-KaU-ZaU",
                    description: "طريقة تحويل السكربت إلى صوت بشر طبيعي جداً باللغة العربية مع ضبط الأداء والمشاعر.",
                    resources: [
                        { name: "🔗 موقع أدوات الهندسة الصوتية", url: "#" }
                    ]
                },
                {
                    id: "lesson-8",
                    title: "8. مونتاج الفيديو وتركيب وتناسق الموسيقى",
                    duration: "فيديو 8",
                    videoUrl: "https://drive.google.com/uc?export=download&id=19nkPdmqSp88MKHiuvEkRZ0wZvvBzUzEf",
                    description: "تجميع كافة المشاهد في برنامج المونتاج، ضبط التوقيتات، ودمج الموسيقى التيكتيكية بنقاء عالٍ.",
                    resources: []
                },
                {
                    id: "lesson-9",
                    title: "9. استخدام الـ AI في المونتاج السريع والاحترافي",
                    duration: "فيديو 9",
                    videoUrl: "https://drive.google.com/uc?export=download&id=1ZukUFEJEmA_84-N3U-OQFk_UNCLRw-Ue",
                    description: "توظيف تقنيات الذكاء الاصطناعي لتسريع عمليات المونتاج، القطعات الذكية، وإضافة المؤثرات البصرية.",
                    resources: []
                }
            ]
        },
        {
            id: "module-4",
            title: "الوحدة الرابعة: المهارات المتقدمة والمشروع التطبيقي",
            description: "أفضل المواقع، التوليد الطويل، والمشروع الإعلاني النهائي",
            lessons: [
                {
                    id: "lesson-10",
                    title: "10. أفضل المواقع التي تستحق الاشتراك في الـ AI",
                    duration: "فيديو 10",
                    videoUrl: "https://drive.google.com/uc?export=download&id=1zQ7XU9MTojmJf5-HKstYiNWG0OX-aXRW",
                    description: "مراجعة وترشيح لأفضل وأقوى المنصات والأدوات المدفوعة والمجانية التي تعطي أفضل قيمة مقابل السعر.",
                    resources: [
                        { name: "📋 قائمة أفضل مواقع الذكاء الاصطناعي الموصى بها", url: "#" }
                    ]
                },
                {
                    id: "lesson-11",
                    title: "11. كيفية عمل فيديو يتجاوز 10 ثواني على Flow",
                    duration: "فيديو 11",
                    videoUrl: "https://drive.google.com/uc?export=download&id=1Go1uDRRlRi1Tij7cF7R2R1YcC8pepPhm",
                    description: "سر وتكنيك زيادة مخرج فيديو الذكاء الاصطناعي ليتجاوز الـ 10 ثواني دون انقطاع الجودة أو المشهد.",
                    resources: []
                },
                {
                    id: "lesson-12",
                    title: "12. الخاتمة والمشروع التطبيقي الكامل",
                    duration: "فيديو 12",
                    videoUrl: "https://drive.google.com/uc?export=download&id=1ue1bKgo6go9gLPnQx7zU4sZJZpx3xULn",
                    description: "الملخص النهائي للكورس وتطبيق شامل خطوة بخطوة لمشروعك الإعلاني النهائي ومناصحة التصدير للنشر.",
                    resources: [
                        { name: "🎓 شهادة إتمام كورس صناعة الفيديوهات مع شيرين", url: "#" }
                    ]
                }
            ]
        }
    ]
};
