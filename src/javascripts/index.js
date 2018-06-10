import route from 'riot-route';
import Request from './request';
import Helper from './helper';
import Format from './format';
import Validator from './validator';
import Controller from './controller';
import Resource from './resource';

global.route = route;
global.observable = riot.observable();
global.request = new Request();
global.helper = new Helper();
global.format = new Format();
global.validator = new Validator();
global.RC = new Resource;
new Controller();

import '../components/common/app';
import '../components/common/header';
import '../components/common/common-header';
import '../components/common/common-footer';
import '../components/common/pagenation';
import '../components/common/title-reactive';

import '../components/judgement/judgement-list';
import '../components/judgement/judgement-detail';
import '../components/law/law-list';
import '../components/law/law-detail';
import '../components/introduce/introduce';
import '../components/mypage/mypage';

import '../components/member/member-add';
import '../components/member/member-edit';
import '../components/member/member-list';
import '../components/member/member-purchase-list';

import '../components/product/product-list';
import '../components/product/product-detail';

import '../components/profile/profile';

import '../components/withdrawal/withdrawal';

import '../components/root/root';
import '../components/root/signin';
import '../components/root/signup';

import '../stylesheets/reset.css';
import '../stylesheets/common.css';
import '../../semantic/dist/semantic.min.css';
import '../stylesheets/individual.css';

import 'semantic-ui-riot';

riot.mount('*');