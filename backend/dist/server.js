"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_router_1 = __importDefault(require("./routers/user.router"));
const vikendica_router_1 = __importDefault(require("./routers/vikendica.router"));
const rezervacija_router_1 = __importDefault(require("./routers/rezervacija.router"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// .png slike 300x300 zauzimaju vise mesta nego sto json predvidja:
//app.use(express.json())
app.use(express_1.default.json({ limit: '1mb' }));
app.use(express_1.default.urlencoded({ limit: '1mb', extended: true }));
mongoose_1.default.connect('mongodb://localhost:27017/projekat');
const conn = mongoose_1.default.connection;
conn.once('open', () => {
    console.log("DB ok");
});
const router = express_1.default.Router();
router.use('/korisnici', user_router_1.default);
router.use('/vikendice', vikendica_router_1.default);
router.use('/rezervacije', rezervacija_router_1.default);
app.use('/', router);
app.listen(4000, () => console.log('Express running on port 4000'));
