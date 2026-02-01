import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contato" className="bg-foreground text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-serif font-semibold mb-4">Art Decor</h3>
            <p className="text-primary-foreground/70 leading-relaxed">
              Transformando ambientes com elegância e sofisticação há mais de 40
              anos. Cortinas e persianas sob medida.
            </p>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-medium mb-4">Contato</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/5521983216443"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  (21) 98321-6443
                </a>
              </li>
              <li>
                <a
                  href="mailto:cortinas@gmail.com.br"
                  className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
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
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-medium mb-4">Endereço</h4>
            <a
              href="https://maps.google.com/?q=Av.+Lúcio+Meira,+551+-+Várzea,+Teresópolis+-+RJ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
              <span>
                Av. Lúcio Meira, 551 - Várzea
                <br />
                Teresópolis - RJ, 25953-006
              </span>
            </a>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-medium mb-4">Redes Sociais</h4>
            <div className="flex gap-4">
              <motion.a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
            <p>© {currentYear} Art Decor. Todos os direitos reservados.</p>
            <p>Teresópolis - Rio de Janeiro, Brasil</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
