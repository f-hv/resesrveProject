import { Directive, Input, OnInit, AfterViewInit, ElementRef, NgZone, Inject, Injector } from "@angular/core";
import { ControlValueAccessor, FormControl, NgControl, Validators } from "@angular/forms";
import { ReCaptchaConfig } from "../models/reCaptchaConfig.model";

@Directive({
    selector: '[nbRecaptcha]',
})
export class ReCaptchaDirective implements OnInit, AfterViewInit, ControlValueAccessor {
    @Input() key: string;
    @Input() config: ReCaptchaConfig = {};
    @Input() lang: string;
    private onChange: (value: string) => void;
    private onTouched: (value: string) => void;
    private widgetId: number;
    private control: FormControl;
    declare const grecaptcha: any;

    constructor(private element: ElementRef, private ngZone: NgZone, private injector: Injector) { }

    ngOnInit() {
        this.registerReCaptchaCallback();
        this.addScript();
    }
    ngAfterViewInit() {
        this.control = this.injector.get(NgControl).control;
        this.setValidator();
    }
    private setValidator() {
        this.control.setValidators(Validators.required);
        this.control.updateValueAndValidity();
    }

    registerReCaptchaCallback() {
        window.reCaptchaLoad = () => {
            const config = {
                ...this.config,
                'sitekey': this.key,
                'callback': this.onSuccess.bind(this),
                'expired-callback': this.onExpired.bind(this)
            };
            this.widgetId = this.render(this.element.nativeElement, config);
        };
    }

    private render(element: HTMLElement, config: any): number {
        return grecaptcha.render(element, config);
    }

    addScript() {
        let script = document.createElement('script');
        const lang = this.lang ? '&hl=' + this.lang : '';
        script.src = `https://www.google.com/recaptcha/api.js?onload=reCaptchaLoad&render=explicit${lang}`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
    }
    onExpired() {
        this.ngZone.run(() => {
            this.onChange('null');
            this.onTouched('null');
        });
    }

    onSuccess(token: string) {
        this.ngZone.run(() => {
            this.onChange(token);
            this.onTouched(token);
        });
    }
    writeValue(obj: any): void {
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

}

declare global {
    interface Window {
        grecaptcha: any;
        reCaptchaLoad: () => void
    }
}