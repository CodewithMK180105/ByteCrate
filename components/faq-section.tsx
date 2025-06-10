import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Is this free to use?",
    answer:
      "Yes! DevToolkit is completely free to use. All tools are available without any registration or payment required. We believe in providing value to the developer community.",
  },
  {
    question: "How secure is the password generator?",
    answer:
      "Our password generator uses cryptographically secure random number generation and runs entirely in your browser. No passwords are stored or transmitted to our servers.",
  },
  {
    question: "Can I request new tools?",
    answer:
      "We're always looking to add new tools that help developers. You can submit feature requests through our GitHub repository or contact form.",
  },
  {
    question: "Do you store my data?",
    answer:
      "No, we don't store any of your data. All tools run locally in your browser, ensuring your privacy and security. Your data never leaves your device.",
  },
  {
    question: "Is there an API available?",
    answer:
      "Currently, all tools are web-based. We're considering API access for certain tools in the future. Stay tuned for updates!",
  },
  {
    question: "Can I use this offline?",
    answer:
      "Most tools work offline once the page is loaded, as they run entirely in your browser. However, tools that require external data (like DNS lookup) need an internet connection.",
  },
]

export function FAQSection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Got questions? We've got answers. If you can't find what you're looking for, feel free to reach out to us.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
