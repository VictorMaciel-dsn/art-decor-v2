import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 md:px-6 lg:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl md:text-2xl font-serif font-semibold mb-3 md:mb-4">Art Decor</h3>
            <p className="text-sm md:text-base text-primary-foreground/70 leading-relaxed">
              40 anos transformando ambientes com elegância.
            </p>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-base md:text-lg font-medium mb-3 md:mb-4">Contato</h4>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <a
                  href="https://wa.me/5521983216443"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 md:gap-3 text-sm md:text-base text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  (21) 98321-6443
                </a>
              </li>
              <li>
                <a
                  href="mailto:cortinas@gmail.com.br"
                  className="flex items-center gap-2 md:gap-3 text-sm md:text-base text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  cortinas@gmail.com.br
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-base md:text-lg font-medium mb-3 md:mb-4">Endereço</h4>
            <a
              href="https://maps.google.com/?q=Av.+Lúcio+Meira,+551+-+Várzea,+Teresópolis+-+RJ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 md:gap-3 text-sm md:text-base text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>
                Av. Lúcio Meira, 551 - Várzea
                <br />
                Teresópolis - RJ
              </span>
            </a>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-base md:text-lg font-medium mb-3 md:mb-4">Redes Sociais</h4>
            <div className="flex gap-3 md:gap-4">
              <motion.a
                href="#"
                className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram className="w-4 h-4 md:w-5 md:h-5" />
              </motion.a>
              <motion.a
                href="#"
                className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Facebook className="w-4 h-4 md:w-5 md:h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 md:px-6 lg:px-12 py-4 md:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 text-xs md:text-sm text-primary-foreground/50">
            <p>© {currentYear} Art Decor. Todos os direitos reservados.</p>
            <p>Teresópolis - RJ, Brasil</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
